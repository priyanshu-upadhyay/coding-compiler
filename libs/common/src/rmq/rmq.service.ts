import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { AppLogger } from '@app/common';
import * as os from 'os';


@Injectable()
export class RmqService {
  private prefetchCount: number;
  private readonly logger = new AppLogger(RmqService.name);
  
  constructor(private readonly configService: ConfigService) {
    const totalRam = os.totalmem() / (1024 * 1024); // Convert total RAM to MB
    const containerSize = 200; // Specify the container size in MB
    this.prefetchCount = this.calculatePrefetchCount(totalRam, containerSize);
  }

  getOptions(queue: string, noAck = false): RmqOptions {
    const options: RmqOptions =  {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
        prefetchCount: this.configService.get<number>("RABBIT_MQ_PREFETCH") || this.prefetchCount,
      },
    };
    this.logger.info("RabbitMQ Consumer options", options);
    return options;
  }

  async ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    await channel.ack(originalMessage);
  }

  calculatePrefetchCount(totalRam: number, containerSize: number): number {
    const availableRam = totalRam * 0.80; // 20% less than total RAM
    const prefetchCount = Math.floor(availableRam / containerSize);
    return prefetchCount;
  }
}