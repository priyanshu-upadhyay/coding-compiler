import * as readline from 'readline';
import * as fs from 'fs';
import { ExecutionStatus } from '@prisma/client';


async function getSuccessExecutionStatus(filePath: string): Promise<ExecutionStatus[]> {
  const status: ExecutionStatus[] = [];
    const fileStream = fs.createReadStream(`${filePath}/status.out`);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const code = line.trim();
      if (code !== '') { // Ignore blank lines
        if(code == "0")
        {
          status.push(ExecutionStatus.SUCCESSFUL_EXECUTION);
        }
        else if(code == "1")
        {
          status.push(ExecutionStatus.RUNTIME_ERROR);
        }
        else if(code == "2")
        {
          status.push(ExecutionStatus.MEMORY_LIMIT_EXCEEDED);
        }
        else if(code == "3")
        {
          status.push(ExecutionStatus.TIME_LIMIT_EXCEEDED);
        }
        else if(code == "4")
        {
          status.push(ExecutionStatus.OUTPUT_LIMIT_REACHED);
        }
        else
        {
          status.push(ExecutionStatus.UNKNOWN_EXECUTION_ERROR);
        }
      }
    }
    return status;
}

export {getSuccessExecutionStatus};
// 0 -> SUCCESSFUL_EXECUTION 1 -> RUNTIME_ERROR 2 -> MEMORY_LIMIT_EXCEEDED 3 -> TIME_LIMIT_EXCEEDED 4 -> UNKONOWN_ERROR
