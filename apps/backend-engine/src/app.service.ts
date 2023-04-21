import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/common';
import { ExecutionSubmissions, SubmissionStatus } from '@prisma/client';
import { DirectoryManager, DockerService, ScriptGenerator } from './helpers';
import { decodeBase64ArrayOfStrings, decodeBase64String, encodeBase64OutputFiles, encodeFileBase64String, getSuccessExecutionStatus, getSuccessExecutionTime } from './functions';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService,
              private readonly dirService: DirectoryManager,
              private readonly dockerService: DockerService) {}

  async executeSubmission(submissionId : string) {
    let execute : ExecutionSubmissions = await this.db.executionSubmissions.findUniqueOrThrow({ where: { submission_id: submissionId } });
    const programmingLanguageScript = new ScriptGenerator(execute.programming_language)
    const {basePath, submissionPath, resultPath} = this.dirService.getAndCreateFoldersForExecution();
    const codeFileExtension = programmingLanguageScript.getFileExtension();

    this.dirService.writeTestCases(decodeBase64ArrayOfStrings(execute.input_array)); 
    this.dirService.writeFileWithName(decodeBase64String(execute.source_code), `main${codeFileExtension}`);
    this.dirService.writeFileWithName(programmingLanguageScript.getEndpointFileContent(), "inside.sh");
    const containerName : string = `GLACompiler-${execute.submission_id}-${uuidv4()}`
    const containerObj = await this.dockerService.createContainer(programmingLanguageScript.getDockerImageName(), containerName);
    const containerId = containerObj.id;
    await this.dockerService.startContainer(containerId);
    await this.dockerService.copyToContainer(containerId, submissionPath, "/");
    // Taken for Execution
    await this.db.executionSubmissions.update({ where: { submission_id: submissionId }, data: { submission_status: SubmissionStatus.IN_PROCESS }});
    const output = await this.dockerService.execInContainer(containerId, ['/bin/sh', '-c', `cd GLACompiler && bash inside.sh ${execute.input_array.length}`]);
    await this.dockerService.copyFromContainer(containerId, "/GLACompiler/result", submissionPath);
    // let result = await getSuccessExecutionStatus(resultPath);
    // let result = await encodeFileBase64String(resultPath, "compilation_error.out");
    // console.log(output);
    // let resultOutput = await encodeBase64OutputFiles(resultPath);
    // let time_exec = await getSuccessExecutionTime(resultPath);
    // console.log(resultOutput, result, time_exec);
    await this.db.executionSubmissions.update({ where: { submission_id: submissionId }, data: { submission_status: SubmissionStatus.SUCCESS}});
    await this.dockerService.removeContainer(containerId);
    this.dirService.deleteFolder(basePath);
  }
}
