import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, rmSync} from 'fs';
const path = require('path');
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DirectoryManager {
  private submissionfolderPath : string;
  private tempFolderPath : string;

  constructor()
  {
    const folderPath = path.join(process.cwd(), "temp");
    if(!existsSync(folderPath))
    {
      mkdirSync(folderPath, { recursive: true });
    }
    this.tempFolderPath = folderPath;
    console.log("Temp Folder is Created");
  }

  getAndCreateFoldersForExecution(submissionFolderName ?: string) : {basePath : string, submissionPath : string, resultPath : string} {
    const folderName  : string = submissionFolderName ?? uuidv4();
    const basePath = path.join(this.tempFolderPath, folderName);
    const submissionPath = path.join(this.tempFolderPath, `${folderName}/GLACompiler`);
    const resultPath = path.join(this.tempFolderPath, `${folderName}/GLACompiler/result`);
    if(!existsSync(submissionPath))
    {
      mkdirSync(resultPath, { recursive: true });
    }
    this.submissionfolderPath = submissionPath;
    console.log("Submission folder is created");
    return {basePath, submissionPath, resultPath};
  }
  
  writeTestCases(fileContents: string[]) {
    for (let i = 0; i < fileContents.length; i++) {
      const filePath = `${this.submissionfolderPath}/testcase${i+1}.in`;
      writeFileSync(filePath, fileContents[i]);
    }
    console.log("Test Cases are Written");
  }

  writeFileWithName(fileContent: string, fileName : string) {
    const filePath = `${this.submissionfolderPath}/${fileName}`;
    writeFileSync(filePath, fileContent);
    console.log(`File has been written : ${fileName}`);
  }

  deleteFolder(path : string)
  {
    rmSync(path, { recursive: true, force: true });
    console.log(`Folder has been deleted : ${path}`)
  }
}
