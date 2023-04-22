import { encodeFileBase64String, getSuccessExecutionStatus, getSuccessExecutionTime } from '../functions';
import { ExecutionStatus } from '@prisma/client';

async function handleCompilationErrorResponse(resultPath : string) : Promise<string>
{
  const compilationError: string = await encodeFileBase64String(resultPath, "compilation_error.out");
  return compilationError;
}

async function handleSuccessExecutionResponse(resultPath : string) : Promise<{ executionStatus: ExecutionStatus[], executionTime: string[], executionOutput: string[] }>
{
  const executionStatus : ExecutionStatus[] = await getSuccessExecutionStatus(resultPath);
  const executionTime   : string[] = await getSuccessExecutionTime(resultPath);
  const executionOutput : string[] = [];
  for (let i = 0; i < executionStatus.length; i++) {
    if ((executionStatus[i] == ExecutionStatus.SUCCESSFUL_EXECUTION) || (executionStatus[i] == ExecutionStatus.RUNTIME_ERROR)) {
      const encodeOutput: string = await encodeFileBase64String(resultPath, `output${i + 1}.out`);
      executionOutput.push(encodeOutput);
    }
    else {
      executionOutput.push("");
    }
  }
  return { executionStatus, executionTime, executionOutput };
}

export {handleCompilationErrorResponse, handleSuccessExecutionResponse}