// import { DynamicModule, Module } from '@nestjs/common';
// import type { RedisClientOptions } from 'redis';
// const redisStore = require('cache-manager-redis-store').redisStore;
// import { CacheModule } from '@nestjs/cache-manager';

// @Module({
// })
// export class RedisModule {
//   static register(): DynamicModule {
//     return {
//       module: RedisModule,
//       imports: [
//         CacheModule.register<RedisClientOptions>({
//             isGlobal : true,
//             store : redisStore,
//             url : "redis://localhost:6379",
//             ttl : 5000
//           })
//       ],
//       exports: [CacheModule]
//     };
//   }
// }


import { DynamicModule, Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
const redisStore = require('cache-manager-redis-store').redisStore;
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({})
export class RedisModule {
  static register(): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        CacheModule.registerAsync({
          useFactory: (configService: ConfigService) : CacheModuleOptions<RedisClientOptions>=> ({
            isGlobal: true,
            store: redisStore,
            url: configService.get<string>('REDIS_URL'),
            ttl: configService.get<number>('REDIS_TTL'),
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [CacheModule],
    };
  }
}