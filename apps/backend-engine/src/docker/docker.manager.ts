import { Injectable } from '@nestjs/common';
import * as Dockerode from 'dockerode';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
const DockerodeSimple = require('simple-dockerode');

const exec = promisify(execCallback);

@Injectable()
export class DockerService {
  private readonly docker: Dockerode;
  private readonly dockerSimple;

  constructor() {
    this.docker = new Dockerode();
    this.dockerSimple = new DockerodeSimple();
  }

  async createContainer(image: string, name: string): Promise<Dockerode.Container> {
    const defaultConfig : Dockerode.ContainerCreateOptions = {
      Image: image,
      name,
      Cmd: ['/bin/bash', '-c', 'tail -f /dev/null'],
      HostConfig: {
        Memory: 200 * 1024 * 1024, // Memory limit to 200 MB
      },
    };
    const container = await this.docker.createContainer(defaultConfig);
    return container;
  }

  async startContainer(containerId: string): Promise<void> {
    const container = this.docker.getContainer(containerId);
    await container.start();
  }

  async stopContainer(containerId: string): Promise<void> {
    const container = this.docker.getContainer(containerId);
    await container.stop();
  }

  async removeContainer(containerId: string): Promise<void> {
    const container = this.docker.getContainer(containerId);
    await container.remove();
  }

  async copyToContainer(containerId: string, source: string, destination: string): Promise<void> {
    const command = `docker cp ${source} ${containerId}:${destination}`;
    await exec(command);
  }
  
  async copyFromContainer(containerId: string, source: string, destination: string): Promise<void> {
    const command = `docker cp ${containerId}:${destination} ${source}`;
    await exec(command);
  }

  async execInContainer(containerId: string, command: string[]): Promise<{ exitCode: number, stdout: string, stderr: string }> {
    const container = this.dockerSimple.getContainer(containerId);
    const results = await container.exec(command, {stdout: true, stderr: true});
    return {exitCode : results.inspect.ExitCode, stdout : results.stdout, stderr: results.stderr};
  }

}

