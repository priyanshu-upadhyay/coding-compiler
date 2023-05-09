import { AppLogger, DatabaseService } from '@app/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ExecutionSubmissions } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class CheckStatusService {
  private logger;
  constructor(private readonly db: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async submissionStatus(submissionId : string) : Promise<ExecutionSubmissions>
  {
    this.logger = new AppLogger(submissionId);
    const cachedSubmission : ExecutionSubmissions  = await this.cacheManager.get(submissionId);
    if (cachedSubmission) 
    {
      this.logger.info("DATA RETRIVED CACHE");
      return cachedSubmission;
    }
    const submission: ExecutionSubmissions = await this.db.executionSubmissions.findUnique
    (
      { where: { submission_id: submissionId } 
      }
    );
    this.logger.info("NOT FOUND IN DATABASE");
    if(submission == null) throw new NotFoundException(`Submission with ID ${submissionId} not found.`);
    this.cacheManager.set(submission.submission_id, submission);
    return submission;
  }
}
