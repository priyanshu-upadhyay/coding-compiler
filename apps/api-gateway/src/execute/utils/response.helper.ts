import { ExecutionSubmissions } from "@prisma/client";
import { ExecuteResponse } from "../types";

export function makeSubmitReponse(execute : ExecutionSubmissions) : ExecuteResponse
{
  const response: ExecuteResponse = {
    submission_id: execute.submission_id,
    programming_language: execute.programming_language,
    submission_status: execute.submission_status,
    date_created: execute.date_created,
    date_modified: execute.date_modified
  };
  return response;
}