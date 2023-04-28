import { Inject, Injectable } from '@nestjs/common';
import { AppLogger, DatabaseService } from '@app/common';
import { ExecutionSubmissions, SubmissionStatus } from '@prisma/client';
import { DirectoryManager, DockerService, ScriptGenerator } from './helpers';
import { decodeBase64ArrayOfStrings, decodeBase64String, handleCompilationErrorResponse, handleSuccessExecutionResponse } from './functions';
import { v4 as uuidv4 } from 'uuid';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class BackendEngineService {
  private readonly logger = new AppLogger(BackendEngineService.name);
  constructor(private readonly db: DatabaseService,
    private readonly dirService: DirectoryManager,
    private readonly dockerService: DockerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async executeSubmission(submissionId: string) {
    let execute: ExecutionSubmissions = await this.db.executionSubmissions.findUniqueOrThrow
    (
      { where: { submission_id: submissionId } }
    );
    const inputArraySize = execute.input_array.length;
    const languageScript = new ScriptGenerator(execute.programming_language);
    execute = await this.db.executionSubmissions.update
              (
                { where: { submission_id: submissionId }
                , data: { submission_status: SubmissionStatus.IN_PROCESS}
                }
              );
    await this.cacheManager.set(execute.submission_id, execute);
    const { basePath, submissionPath, resultPath } = this.dirService.getAndCreateFoldersForExecution();
    this.dirService.writeTestCases(decodeBase64ArrayOfStrings(execute.input_array));
    this.dirService.writeFileWithName(decodeBase64String(execute.source_code), `main${languageScript.getFileExtension()}`);
    const workingDir: string = "/compiler";
    const containerName: string = `GLACompiler-${uuidv4()}`;
    const containerId = await this.dockerService.createContainer(languageScript.getDockerImageName(), containerName, workingDir);
    this.logger.info("CONTAINER CREATED", { containerName: containerName, containerId: containerId, submissionId: execute.submission_id });
    await this.dockerService.copyToContainer(containerId, submissionPath, "/");
    await this.dockerService.startContainer(containerId);
    const insideBashOutput = await this.dockerService.execInContainer(containerId, ['bash', '-c', languageScript.getEndpointFileContent(inputArraySize)]);
    await this.dockerService.copyFromContainer(containerId, `${workingDir}/result`, submissionPath);
    this.logger.info("INSIDE BASH FILE OUTPUT", insideBashOutput);
    if (insideBashOutput.exitCode == 2) 
    {
      const compilationError: string = await handleCompilationErrorResponse(resultPath);
      execute = await this.db.executionSubmissions.update
                (
                  { where : { submission_id: submissionId }
                  , data  : { submission_status: SubmissionStatus.SUCCESS, compilation_error : compilationError}
                  }
                );
    }
    else if (insideBashOutput.exitCode == 0) 
    {
      const { executionStatus, executionTime, executionOutput } = await handleSuccessExecutionResponse(resultPath);
      execute = await this.db.executionSubmissions.update
                (
                  { where  : { submission_id : submissionId }
                  , data   : { submission_status : SubmissionStatus.SUCCESS, execution_output : executionOutput, execution_status : executionStatus, execution_time : executionTime}
                  }
                );
    }
    else 
    {
      execute = await this.db.executionSubmissions.update
                      (
                        { where  : { submission_id : submissionId }
                        , data   : { submission_status : SubmissionStatus.FAILURE, metadata : JSON.stringify(insideBashOutput)}
                        }
                      );
    }
    await this.cacheManager.set(execute.submission_id, execute);
    try {
      await this.dockerService.removeContainer(containerId);
      this.dirService.deleteFolder(basePath);
    } catch (error) {
      this.logger.error(`Failed to delete the data for ${execute.submission_id}`, error);
    }
    this.logger.info(`TASK COMPLETED FOR ${execute.submission_id}`);
  }
}
