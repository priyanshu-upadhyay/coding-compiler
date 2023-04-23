import { AppLogger, DatabaseService } from '@app/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ExecutionSubmissions } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class CheckStatusService {
  private readonly logger = new AppLogger(CheckStatusService.name);
  constructor(private readonly db: DatabaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async submissionStatus(submissionId : string) : Promise<ExecutionSubmissions>
  {
    const cachedSubmission : ExecutionSubmissions  = await this.cacheManager.get(submissionId);
    if (cachedSubmission) 
    {
      this.logger.info(`CACHE RESPONSE","Data Retrived for ${submissionId}`)
      return cachedSubmission;
    }
    const submission: ExecutionSubmissions = await this.db.executionSubmissions.findUnique
    (
      { where: { submission_id: submissionId } 
      }
    );
    if(submission == null) throw new NotFoundException(`Submission with ID ${submissionId} not found.`);
    this.cacheManager.set(submission.submission_id, submission);
    return submission;
  }
}
