import { DatabaseService } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ExecutionSubmissions } from '@prisma/client';

@Injectable()
export class CheckStatusService {
  constructor(private readonly db: DatabaseService) {}

  async submissionStatus(submissionId : string)
  {
    const submission: ExecutionSubmissions = await this.db.executionSubmissions.findUnique
    (
      { where: { submission_id: submissionId } 
      }
    );
    if(submission == null) throw new NotFoundException(`Submission with ID ${submissionId} not found.`);
    return submission;
  }
}
