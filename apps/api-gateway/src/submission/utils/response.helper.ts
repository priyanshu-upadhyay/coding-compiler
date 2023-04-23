import { ExecutionSubmissions } from "@prisma/client";
import { SubmissionResponse } from "../types";

export function makeSubmitReponse(submission : ExecutionSubmissions) : SubmissionResponse
{
  const response: SubmissionResponse = {
    submission_id: submission.submission_id,
    programming_language: submission.programming_language,
    submission_status: submission.submission_status,
    date_created: submission.date_created,
    date_modified: submission.date_modified
  };
  return response;
}