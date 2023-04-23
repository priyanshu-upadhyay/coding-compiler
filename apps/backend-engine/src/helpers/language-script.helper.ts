import { ConfigService } from '@nestjs/config';
import { ProgrammingLanguages } from '@prisma/client';

type LanguageUtils = {
  [key in ProgrammingLanguages]: {
    compilation : string | null;
    execution   : string;
    extension   : string;
  };
};

export class ScriptGenerator {
  private readonly programmingLanguage: ProgrammingLanguages;
  private readonly configService : ConfigService;

  constructor(programmingLanguage: ProgrammingLanguages) {
    this.programmingLanguage = programmingLanguage;
    this.configService = new ConfigService;
  }

  private readonly languageUtils: LanguageUtils = {
    CPP : {
      compilation : "g++ main.cpp -o exec",
      execution   : "./exec",
      extension   : ".cpp",
    },
    JAVA: {
      compilation : "javac main.java",
      execution   : "java main",
      extension   : ".java",
    },
    C: {
      compilation : "gcc -Werror main.c -o exec",
      execution   : "./exec",
      extension   : ".c",
    },
    PYTHON3: {
      compilation : null,
      execution   : "python3 main.py",
      extension   : ".py",
    }
  };

  private isCompilationSupportedLanguage(): boolean {
    return (this.languageUtils[this.programmingLanguage].compilation != null);
  }

  private getCompilationCommand(): string {
    return this.languageUtils[this.programmingLanguage].compilation;
  }

  private getExecutionCommand(): string {
    return this.languageUtils[this.programmingLanguage].execution;
  }

  private getTimeLimit(): string {
    return this.configService.get<string>('TIME_LIMIT') || "1s";
  }

  private getStackMemoryLimit(): string {
    // This is equal to 250 MB (MegaBytes)
    return this.configService.get<string>('MEMORY_LIMIT') || "256000";
  }

  private getOutputFileSizeLimit(): string {
    // This is equals to 10 MB (MegaBytes) (10 * 1024)
    return this.configService.get<string>('MEMORY_LIMIT') || "10240";
  }

  public getFileExtension(): string {
    return this.languageUtils[this.programmingLanguage].extension;
  }

  public getDockerImageName(): string {
    const imageNameFromConfig = this.configService.get<string>(`${this.programmingLanguage}_IMAGE_NAME`)
    switch(this.programmingLanguage)
    {
      case 'CPP':
        return imageNameFromConfig || "cpp";
      case 'JAVA':
        return imageNameFromConfig || "java";
      case 'PYTHON3':
        return imageNameFromConfig || "python3";
      case 'C':
        return imageNameFromConfig || "clang";
    }
  }
  
  public getEndpointFileContent(): string {
    let content: string = "#!/usr/bin/env bash\n";
    if (this.isCompilationSupportedLanguage()) {
      content += `${this.getCompilationCommand()} 2> result/compilation_error.out\n` +
        `ret=$?\nif [ $ret -ne 0 ]\nthen\n  exit 2\nfi\n\n`;
    }
    content += `n=$1     # Number of test cases\n` +
      `for i in $(seq 1 $n)\n` +
      `do\n` +
      `    # Set resource limits for the program\n` +
      `    ulimit -s ${this.getStackMemoryLimit()} -f ${this.getOutputFileSizeLimit()}\n` +
      `    # Run the program with a timeout and redirect the output to a file\n` +
      `    (time timeout ${this.getTimeLimit()} ${this.getExecutionCommand()} < testcase\${i}.in &> result/output\${i}.out) &>> result/execution_time.out\n` +
      `    ret=$?\n` +
      `    if [ $ret -eq 0 ]; then\n` +
      `      echo 0 >> result/status.out\n` +
      `    elif [ $ret -eq 1 ]; then\n` +
      `      echo 1 >> result/status.out\n` +
      `    elif [ $ret -eq 139 ]; then\n` +
      `      rm result/output\${i}.out\n` +
      `      echo 2 >> result/status.out\n` +
      `    elif [ $ret -eq 124 ]; then\n` +
      `      rm result/output\${i}.out\n` +
      `      echo 3 >> result/status.out\n` +
      `    elif [ $ret -eq 153 -o $ret -eq 120 ]; then\n` +
      `      rm result/output\${i}.out\n` +
      `      echo 4 >> result/status.out\n` +
      `    else\n` +
      `      rm result/output\${i}.out\n` +
      `      echo 5 >> result/status.out\n` +
      `    fi\n` +
      `done\n`;
  
    return content;
  }

}

// 0 -> SUCCESSFUL_EXECUTION 1 -> RUNTIME_ERROR 2 -> MEMORY_LIMIT_EXCEEDED 3 -> TIME_LIMIT_EXCEEDED 4 -> OUTPUT_LIMIT_REACHED 5 -> UNKNOWN_EXECUTION_ERROR

