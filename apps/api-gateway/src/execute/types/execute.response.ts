import { ExecutionStatus, ProgrammingLanguages, SubmissionStatus } from "@prisma/client";

export interface ExecuteResponse {
  submission_id: String;
  programming_language: ProgrammingLanguages;
  submission_status: SubmissionStatus;
  date_created: Date;
  date_modified: Date;
}
