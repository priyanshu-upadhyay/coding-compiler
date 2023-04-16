import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/common';
import { ExecutionSubmissions } from '@prisma/client';
import { DirectoryManager, DockerService, ScriptGenerator } from './helpers';
import { decodeBase64ArrayOfStrings, decodeBase64String } from './functions';
@Injectable()
export class AppService {
  constructor(private readonly db: DatabaseService,
              private readonly dirService: DirectoryManager,
              private readonly dockerService: DockerService) {}

  async executeSubmission(submissionId : string) {
    const execute : ExecutionSubmissions = await this.db.executionSubmissions.findUniqueOrThrow({ where: { submission_id: submissionId } });
    const script = new ScriptGenerator(execute.programming_language)
    const codeFileExtension = script.getFileExtension()
    const submissionFolder = this.dirService.createSubmissionFolder();
    this.dirService.writeTestCases(decodeBase64ArrayOfStrings(execute.data_input)); 
    this.dirService.writeFileWithName(decodeBase64String(execute.typed_code), `main${codeFileExtension}`);
    this.dirService.writeFileWithName(script.getEndpointFileContent(), "inside.sh");
    const containerObj = await this.dockerService.createContainer(script.getDockerImageName(), execute.submission_id);
    const containerId = containerObj.id;
    await this.dockerService.startContainer(containerId);
    await this.dockerService.copyToContainer(containerId, submissionFolder, "/");
    const output = await this.dockerService.execInContainer(containerId, ['/bin/sh', '-c', 'cd GLACompilerFiles && bash inside.sh 3']);
    console.log(output);

  }
}
