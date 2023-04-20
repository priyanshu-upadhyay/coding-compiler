import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  OnModuleInit,
  INestApplication,
  Logger,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel >
  implements OnModuleInit
{
  private readonly logger = new Logger(DatabaseService.name);

  constructor(config: ConfigService) {
    super({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ],
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    }
    );
  }

  async onModuleInit() {
    this.$on("error", (event) => {
      this.logger.error(event);
    });
    this.$on("warn", (event) => {
      this.logger.warn(event);
    });
    this.$on("info", (event) => {
      this.logger.log(event);
    });
    this.$on("query", (event) => {
      this.logger.log(event);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
