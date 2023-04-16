import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/common';
import { ExecutionSubmissions, SubmissionStatus } from '@prisma/client';
import { DirectoryManager, DockerService, ScriptGenerator } from './helpers';
import { decodeBase64ArrayOfStrings, decodeBase64String, getSuccessExecutionStatus } from './functions';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService,
              private readonly dirService: DirectoryManager,
              private readonly dockerService: DockerService) {}

  async executeSubmission(submissionId : string) {
    let execute : ExecutionSubmissions = await this.db.executionSubmissions.findUniqueOrThrow({ where: { submission_id: submissionId } });
    const programmingLanguageScript = new ScriptGenerator(execute.programming_language)
    const submissionFolder = this.dirService.createSubmissionFolder();
    const codeFileExtension = programmingLanguageScript.getFileExtension();

    this.dirService.writeTestCases(decodeBase64ArrayOfStrings(execute.data_input)); 
    this.dirService.writeFileWithName(decodeBase64String(execute.typed_code), `main${codeFileExtension}`);
    this.dirService.writeFileWithName(programmingLanguageScript.getEndpointFileContent(), "inside.sh");

    const containerName : string = `GLACompiler-${execute.submission_id}-${uuidv4()}`
    const containerObj = await this.dockerService.createContainer(programmingLanguageScript.getDockerImageName(), containerName);
    const containerId = containerObj.id;
    await this.dockerService.startContainer(containerId);
    await this.dockerService.copyToContainer(containerId, submissionFolder, "/");
    // Taken for Execution
    await this.db.executionSubmissions.update({ where: { submission_id: submissionId }, data: { submission_status: SubmissionStatus.EXECUTING }});
    const output = await this.dockerService.execInContainer(containerId, ['/bin/sh', '-c', `cd GLACompiler && bash inside.sh ${execute.data_input.length}`]);
    console.log(output);
    await this.dockerService.copyFromContainer(containerId, "/GLACompiler/result", submissionFolder);
    await this.db.executionSubmissions.update({ where: { submission_id: submissionId }, data: { submission_status: SubmissionStatus.TASK_COMPLETED }});
    await this.dockerService.removeContainer(containerId);
    let result = await getSuccessExecutionStatus(submissionFolder);
    console.log(result);
  }
}
