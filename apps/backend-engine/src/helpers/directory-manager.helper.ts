import { AppLogger } from '@app/common';
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, rmSync} from 'fs';
const path = require('path');
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DirectoryManager {
  private readonly logger = new AppLogger(DirectoryManager.name);
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
    this.logger.debug("TEMP FOLDER CREATED", `Path for the Temp folder ${this.tempFolderPath}`);
  }

  getAndCreateFoldersForExecution(submissionFolderName ?: string) : {basePath : string, submissionPath : string, resultPath : string} {
    const folderName  : string = submissionFolderName ?? uuidv4();
    const basePath = path.join(this.tempFolderPath, folderName);
    const submissionPath = path.join(this.tempFolderPath, `${folderName}/compiler`);
    const resultPath = path.join(this.tempFolderPath, `${folderName}/compiler/result`);
    if(!existsSync(submissionPath))
    {
      mkdirSync(resultPath, { recursive: true });
    }
    this.submissionfolderPath = submissionPath;
    this.logger.debug("SUBMISSION FOLDER IS CREATED", this.submissionfolderPath);
    return {basePath, submissionPath, resultPath};
  }
  
  writeTestCases(fileContents: string[]) {
    for (let i = 0; i < fileContents.length; i++) {
      const filePath = `${this.submissionfolderPath}/testcase${i+1}.in`;
      writeFileSync(filePath, fileContents[i]);
    }
    this.logger.debug("TEST CASES ARE WRITTEN");
  }

  writeFileWithName(fileContent: string, fileName : string) {
    const filePath = `${this.submissionfolderPath}/${fileName}`;
    writeFileSync(filePath, fileContent);
    this.logger.debug("FILE HAS BEEN WRITTEN", fileName);
  }

  deleteFolder(path : string)
  {
    rmSync(path, { recursive: true, force: true });
    this.logger.debug("FOLDER HAS BEEN DELETED", path);
  }
}