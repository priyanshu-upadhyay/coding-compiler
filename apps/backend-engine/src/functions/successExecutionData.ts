import * as readline from 'readline';
import * as fs from 'fs';
import { ExecutionStatus } from '@prisma/client';
import * as moment from 'moment';


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
          status.push(ExecutionStatus.OUTPUT_LIMIT_EXCEEDED);
        }
        else
        {
          status.push(ExecutionStatus.UNKNOWN_EXECUTION_ERROR);
        }
      }
    }
    return status;
}

async function getSuccessExecutionTime(filePath: string): Promise<string[]> {
  const executionTime : string[] = [];
    const fileStream = fs.createReadStream(`${filePath}/execution_time.out`);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (line.startsWith('real')) {
        const timeString = line.split('\t')[1];
        const [wholeSecondsString, fractionSecondsString] = timeString.split('.');
        const wholeSeconds = wholeSecondsString ? parseInt(wholeSecondsString) : 0;
        const fractionSeconds = parseFloat(`0.${fractionSecondsString}`);
        const totalSeconds  = wholeSeconds + fractionSeconds;
        executionTime.push(`${totalSeconds}s`);
      }
    }
    return executionTime;
}

export {getSuccessExecutionStatus, getSuccessExecutionTime};





