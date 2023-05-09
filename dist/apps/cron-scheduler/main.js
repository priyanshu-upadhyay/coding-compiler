/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronSchedulerModule = void 0;
const common_1 = __webpack_require__(3);
const cron_scheduler_controller_1 = __webpack_require__(4);
const schedule_1 = __webpack_require__(24);
let CronSchedulerModule = class CronSchedulerModule {
};
CronSchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot()],
        controllers: [cron_scheduler_controller_1.CronSchedulerController],
    })
], CronSchedulerModule);
exports.CronSchedulerModule = CronSchedulerModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CronSchedulerController_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronSchedulerController = void 0;
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(3);
const schedule_1 = __webpack_require__(24);
let CronSchedulerController = CronSchedulerController_1 = class CronSchedulerController {
    constructor() {
        this.logger = new common_1.AppLogger(CronSchedulerController_1.name);
    }
    async func() {
        this.logger.info("Compiler Services is Up - Priyanshu Upadhyay");
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronSchedulerController.prototype, "func", null);
CronSchedulerController = CronSchedulerController_1 = __decorate([
    (0, common_2.Controller)(),
    __metadata("design:paramtypes", [])
], CronSchedulerController);
exports.CronSchedulerController = CronSchedulerController;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(21), exports);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(3);
const database_service_1 = __webpack_require__(7);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [database_service_1.DatabaseService, common_1.Logger],
        exports: [database_service_1.DatabaseService],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DatabaseService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseService = void 0;
const config_1 = __webpack_require__(8);
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(9);
let DatabaseService = DatabaseService_1 = class DatabaseService extends client_1.PrismaClient {
    constructor(config) {
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
        });
        this.logger = new common_1.Logger(DatabaseService_1.name);
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
    async enableShutdownHooks(app) {
        this.$on("beforeExit", async () => {
            await app.close();
        });
    }
};
DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], DatabaseService);
exports.DatabaseService = DatabaseService;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RmqService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
const microservices_1 = __webpack_require__(11);
const common_2 = __webpack_require__(5);
const os = __webpack_require__(12);
let RmqService = RmqService_1 = class RmqService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_2.AppLogger(RmqService_1.name);
        const totalRam = os.totalmem() / (1024 * 1024);
        const containerSize = 200;
        this.prefetchCount = this.calculatePrefetchCount(totalRam, containerSize);
    }
    getOptions(queue, noAck = false) {
        const options = {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBIT_MQ_URI')],
                queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
                prefetchCount: this.configService.get("RABBIT_MQ_PREFETCH") || this.prefetchCount,
            },
        };
        this.logger.info("RabbitMQ Consumer options", options);
        return options;
    }
    async ack(context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        await channel.ack(originalMessage);
    }
    calculatePrefetchCount(totalRam, containerSize) {
        const availableRam = totalRam * 0.80;
        const prefetchCount = Math.floor(availableRam / containerSize);
        return prefetchCount;
    }
};
RmqService = RmqService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RmqService);
exports.RmqService = RmqService;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(8);
const microservices_1 = __webpack_require__(11);
const rmq_service_1 = __webpack_require__(10);
let RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService) => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBIT_MQ_URI')],
                                queue: configService.get(`RABBIT_MQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule]
        };
    }
};
RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);
exports.RmqModule = RmqModule;


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMIT_SUBMISSION = exports.EXECUTION_SERVICE = void 0;
const EXECUTION_SERVICE = "CODE_EXECUTION";
exports.EXECUTION_SERVICE = EXECUTION_SERVICE;
const EMIT_SUBMISSION = "SUBMISSION";
exports.EMIT_SUBMISSION = EMIT_SUBMISSION;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(3);
const logger_service_1 = __webpack_require__(17);
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [common_1.Logger],
        exports: [logger_service_1.LoggerService, logger_service_1.AppLogger],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppLogger = exports.LoggerService = void 0;
const nest_winston_1 = __webpack_require__(18);
const winston_1 = __webpack_require__(19);
const common_1 = __webpack_require__(3);
__webpack_require__(20);
let LoggerService = class LoggerService {
    createLogger(_appName) {
        return nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston_1.transports.DailyRotateFile({
                    filename: `logs/%DATE%-error.log`,
                    level: 'error',
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.printf((info) => {
                        return `${JSON.stringify(info)}`;
                    })),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxFiles: '20d',
                }),
                new winston_1.transports.DailyRotateFile({
                    filename: `logs/%DATE%-combined.log`,
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.printf((info) => {
                        return `${JSON.stringify(info)}`;
                    })),
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxFiles: '90d'
                }),
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.printf((info) => {
                        return `${JSON.stringify(info)}\n`;
                    })),
                }),
            ],
        });
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)()
], LoggerService);
exports.LoggerService = LoggerService;
class AppLogger extends common_1.Logger {
    constructor(context) {
        super(context);
    }
    info(tag, message) {
        super.log({ message: message, tag: tag });
    }
    error(tag, message) {
        super.error({ message: message, tag: tag });
    }
    warn(tag, message) {
        super.warn({ message: message, tag: tag });
    }
    debug(tag, message) {
        super.debug({ message: message, tag: tag });
    }
    verbose(tag, message) {
        super.verbose({ message: message, tag: tag });
    }
}
exports.AppLogger = AppLogger;


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisModule = void 0;
const common_1 = __webpack_require__(3);
const redisStore = (__webpack_require__(22).redisStore);
const cache_manager_1 = __webpack_require__(23);
const config_1 = __webpack_require__(8);
let RedisModule = RedisModule_1 = class RedisModule {
    static register() {
        return {
            module: RedisModule_1,
            imports: [
                cache_manager_1.CacheModule.registerAsync({
                    useFactory: (configService) => ({
                        isGlobal: true,
                        store: redisStore,
                        url: configService.get('REDIS_URL'),
                        ttl: configService.get('REDIS_TTL'),
                    }),
                    inject: [config_1.ConfigService],
                }),
            ],
            exports: [cache_manager_1.CacheModule],
        };
    }
};
RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Module)({})
], RedisModule);
exports.RedisModule = RedisModule;


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("cache-manager-redis-store");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const cron_scheduler_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(5);
async function bootstrap() {
    const app = await core_1.NestFactory.create(cron_scheduler_module_1.CronSchedulerModule, { logger: new common_1.LoggerService().createLogger("cron-scheduler") });
    await app.init();
}
bootstrap();

})();

/******/ })()
;