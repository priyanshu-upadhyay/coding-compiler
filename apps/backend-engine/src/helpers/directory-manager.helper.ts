import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFile, writeFileSync } from 'fs';
const path = require('path');
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DirectoryManager {
  private executionfolderPath : string;
  private baseDirPath : string;

  constructor()
  {
    const folderPath = path.join(process.cwd(), "temp");
    if(!existsSync(folderPath))
    {
      mkdirSync(folderPath, { recursive: true });
    }
    this.baseDirPath = folderPath;
    console.log("Temp Folder is Created");
  }

  createSubmissionFolder(submissionFolderName ?: string) : string {
    const folderName  : string = submissionFolderName ?? uuidv4();
    const folderPath = path.join(this.baseDirPath, `${folderName}/GLACompiler`);
    const resultFolderPath = path.join(this.baseDirPath, `${folderName}/GLACompiler/result`);
    if(!existsSync(folderPath))
    {
      mkdirSync(resultFolderPath, { recursive: true });
    }
    this.executionfolderPath = folderPath;
    console.log("Submission folder is created");
    return folderPath;
  }
  
  writeTestCases(fileContents: string[]) {
    for (let i = 0; i < fileContents.length; i++) {
      const filePath = `${this.executionfolderPath}/testcase${i+1}.in`;
      writeFileSync(filePath, fileContents[i]);
    }
    console.log("Test Cases are Written");
  }

  writeFileWithName(fileContent: string, fileName : string) {
    const filePath = `${this.executionfolderPath}/${fileName}`;
    writeFileSync(filePath, fileContent);
    console.log(`File has been written : ${fileName}`);
  }
}
