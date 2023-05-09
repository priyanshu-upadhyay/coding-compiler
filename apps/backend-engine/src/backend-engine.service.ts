import { Inject, Injectable } from '@nestjs/common';
import { AppLogger, DatabaseService } from '@app/common';
import { ExecutionSubmissions, SubmissionStatus } from '@prisma/client';
import { DirectoryManager, DockerService, ScriptGenerator } from './helpers';
import { decodeBase64ArrayOfStrings, decodeBase64String, handleCompilationErrorResponse, handleSuccessExecutionResponse } from './functions';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class BackendEngineService {
  private logger;
  constructor(private readonly db: DatabaseService,
    private readonly dirService: DirectoryManager,
    private readonly dockerService: DockerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async executeSubmission(submissionId: string) {
    this.logger = new AppLogger(submissionId);
    let execute: ExecutionSubmissions;
    execute = await this.cacheManager.get(submissionId);
    if (execute == null) 
    {
      this.logger.info("DATA RETRIVED FROM DATABASE");
      execute = await this.db.executionSubmissions.findUniqueOrThrow
      (
        { where: { submission_id: submissionId } }
      ); 
    }
    else
    {
      this.logger.info("DATA FOUND FROM CACHE");
    }
    const inputArraySize = execute.input_array.length;
    const languageScript = new ScriptGenerator(execute.programming_language);
    execute = await this.db.executionSubmissions.update
              (
                { where: { submission_id: submissionId }
                , data: { submission_status: SubmissionStatus.IN_PROCESS}
                }
              );
    await this.cacheManager.set(execute.submission_id, execute);
    this.logger.info("DATA CACHED");
    const { basePath, submissionPath, resultPath } = this.dirService.getAndCreateFoldersForExecution();
    this.dirService.writeTestCases(decodeBase64ArrayOfStrings(execute.input_array));
    this.dirService.writeFileWithName(decodeBase64String(execute.source_code), `main${languageScript.getFileExtension()}`);
    const workingDir: string = "/compiler";
    const containerName: string = `online-compiler-${execute.submission_id}-0`;
    const containerId = await this.dockerService.createContainer(languageScript.getDockerImageName(), containerName, workingDir);
    this.logger.info("CONTAINER CREATED", { containerName: containerName, containerId: containerId });
    await this.dockerService.copyToContainer(containerId, submissionPath, "/");
    await this.dockerService.startContainer(containerId);
    const insideBashOutput = await this.dockerService.execInContainer(containerId, ['bash', '-c', languageScript.getEndpointFileContent(inputArraySize)]);
    await this.dockerService.copyFromContainer(containerId, `${workingDir}/result`, submissionPath);
    this.logger.info("CONTINER OUTPUT", insideBashOutput);
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
    this.logger.info("DATA CACHED");
    try {
      await this.dockerService.removeContainer(containerId);
    } catch (error) {
      this.logger.error("FAILED TO REMOVE CONTAINER", error);
    }
    try {
      this.dirService.deleteFolder(basePath);
    } catch (error) {
      this.logger.error("FAILED TO REMOVE EXECUTION TEMP FOLDER", error);
    }
    this.logger.info("TASK COMPLETED");
  }
}
