/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiGatewayModule = void 0;
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(4);
const submission_module_1 = __webpack_require__(5);
const status_module_1 = __webpack_require__(37);
const common_2 = __webpack_require__(9);
const Joi = __webpack_require__(40);
const api_gateway_middleware_1 = __webpack_require__(41);
let ApiGatewayModule = class ApiGatewayModule {
    configure(consumer) {
        consumer.apply(api_gateway_middleware_1.RequestMiddleware).forRoutes('*');
    }
};
ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        providers: [api_gateway_middleware_1.RequestMiddleware],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    API_GTAEWAY_PORT: Joi.number().required(),
                    REDIS_URL: Joi.string().required(),
                    REDIS_TTL: Joi.number().required(),
                }),
                envFilePath: '.env',
            }),
            submission_module_1.SubmissionModule,
            status_module_1.CheckStatusModule,
            common_2.DatabaseModule,
            common_2.RedisModule.register()
        ],
    })
], ApiGatewayModule);
exports.ApiGatewayModule = ApiGatewayModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubmissionModule = void 0;
const common_1 = __webpack_require__(1);
const submission_controller_1 = __webpack_require__(6);
const submission_service_1 = __webpack_require__(7);
const common_2 = __webpack_require__(9);
let SubmissionModule = class SubmissionModule {
};
SubmissionModule = __decorate([
    (0, common_1.Module)({
        imports: [common_2.RmqModule.register({
                name: common_2.EXECUTION_SERVICE,
            }),
            common_2.RedisModule.register()
        ],
        controllers: [submission_controller_1.SubmissionController],
        providers: [submission_service_1.SubmissionService, common_2.AppLogger]
    })
], SubmissionModule);
exports.SubmissionModule = SubmissionModule;


/***/ }),
/* 6 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubmissionController = void 0;
const common_1 = __webpack_require__(1);
const submission_service_1 = __webpack_require__(7);
const types_1 = __webpack_require__(31);
let SubmissionController = class SubmissionController {
    constructor(submissionService) {
        this.submissionService = submissionService;
    }
    submitter(request) {
        return this.submissionService.submitter(request);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof types_1.SubmissionRequest !== "undefined" && types_1.SubmissionRequest) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SubmissionController.prototype, "submitter", null);
SubmissionController = __decorate([
    (0, common_1.Controller)('submit'),
    __metadata("design:paramtypes", [typeof (_a = typeof submission_service_1.SubmissionService !== "undefined" && submission_service_1.SubmissionService) === "function" ? _a : Object])
], SubmissionController);
exports.SubmissionController = SubmissionController;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubmissionService = void 0;
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(8);
const common_2 = __webpack_require__(9);
const utils_1 = __webpack_require__(26);
const cache_manager_1 = __webpack_require__(29);
const cache_manager_2 = __webpack_require__(25);
const uuid_1 = __webpack_require__(30);
let SubmissionService = class SubmissionService {
    constructor(db, executionClient, cacheManager) {
        this.db = db;
        this.executionClient = executionClient;
        this.cacheManager = cacheManager;
    }
    async submitter(request) {
        const inputArray = (0, utils_1.handleEmptyInputArray)(request.input_array);
        const submission = await this.db.executionSubmissions.create({
            data: {
                source_code: request.source_code,
                input_array: inputArray,
                programming_language: request.programming_language,
                submission_id: (0, uuid_1.v4)()
            }
        });
        this.logger = new common_2.AppLogger(submission.submission_id);
        await this.cacheManager.set(submission.submission_id, submission);
        this.logger.info("DATA CACHED");
        const response = (0, utils_1.makeSubmitReponse)(submission);
        this.executionClient.emit(common_2.EMIT_SUBMISSION, submission.submission_id);
        this.logger.info("EVENT TRIGGERED FOR BACKEND-ENGINE");
        return response;
    }
};
SubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_2.EXECUTION_SERVICE)),
    __param(2, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof common_2.DatabaseService !== "undefined" && common_2.DatabaseService) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _c : Object])
], SubmissionService);
exports.SubmissionService = SubmissionService;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 9 */
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
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(1);
const database_service_1 = __webpack_require__(11);
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
/* 11 */
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
const config_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const client_1 = __webpack_require__(12);
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
/* 12 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 13 */
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
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(8);
const common_2 = __webpack_require__(9);
const os = __webpack_require__(14);
let RmqService = RmqService_1 = class RmqService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_2.AppLogger(RmqService_1.name);
        const totalRam = os.totalmem() / (1024 * 1024);
        const containerSize = 90;
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
/* 14 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 15 */
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
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(4);
const microservices_1 = __webpack_require__(8);
const rmq_service_1 = __webpack_require__(13);
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
/* 16 */
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
__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMIT_SUBMISSION = exports.EXECUTION_SERVICE = void 0;
const EXECUTION_SERVICE = "CODE_EXECUTION";
exports.EXECUTION_SERVICE = EXECUTION_SERVICE;
const EMIT_SUBMISSION = "SUBMISSION";
exports.EMIT_SUBMISSION = EMIT_SUBMISSION;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(1);
const logger_service_1 = __webpack_require__(19);
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
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppLogger = exports.LoggerService = void 0;
const nest_winston_1 = __webpack_require__(20);
const winston_1 = __webpack_require__(21);
const common_1 = __webpack_require__(1);
__webpack_require__(22);
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
/* 20 */
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 23 */
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
const common_1 = __webpack_require__(1);
const redisStore = (__webpack_require__(24).redisStore);
const cache_manager_1 = __webpack_require__(25);
const config_1 = __webpack_require__(4);
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
/* 24 */
/***/ ((module) => {

module.exports = require("cache-manager-redis-store");

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 26 */
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
__exportStar(__webpack_require__(27), exports);
__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleEmptyInputArray = void 0;
function handleEmptyInputArray(inputArray) {
    if (inputArray.length == 0) {
        return [""];
    }
    return inputArray;
}
exports.handleEmptyInputArray = handleEmptyInputArray;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeSubmitReponse = void 0;
function makeSubmitReponse(submission) {
    const response = {
        submission_id: submission.submission_id,
        programming_language: submission.programming_language,
        submission_status: submission.submission_status,
        date_created: submission.date_created,
        date_modified: submission.date_modified
    };
    return response;
}
exports.makeSubmitReponse = makeSubmitReponse;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("cache-manager");

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 31 */
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
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(36), exports);


/***/ }),
/* 32 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubmissionRequest = void 0;
const class_validator_1 = __webpack_require__(33);
const class_transformer_1 = __webpack_require__(34);
const swagger_1 = __webpack_require__(35);
const client_1 = __webpack_require__(12);
class SubmissionRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.ProgrammingLanguages,
        description: 'The programming language of the source code',
    }),
    (0, class_validator_1.IsEnum)(client_1.ProgrammingLanguages),
    __metadata("design:type", typeof (_a = typeof client_1.ProgrammingLanguages !== "undefined" && client_1.ProgrammingLanguages) === "function" ? _a : Object)
], SubmissionRequest.prototype, "programming_language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '`BASE64` encoded source code',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 1000000),
    __metadata("design:type", String)
], SubmissionRequest.prototype, "source_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of `BASE64` encoded input array of testcases for the source code',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.ArrayMaxSize)(50),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], SubmissionRequest.prototype, "input_array", void 0);
exports.SubmissionRequest = SubmissionRequest;


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckStatusModule = void 0;
const common_1 = __webpack_require__(1);
const status_controller_1 = __webpack_require__(38);
const status_service_1 = __webpack_require__(39);
const common_2 = __webpack_require__(9);
let CheckStatusModule = class CheckStatusModule {
};
CheckStatusModule = __decorate([
    (0, common_1.Module)({
        controllers: [status_controller_1.CheckStatusController],
        providers: [status_service_1.CheckStatusService],
        imports: [common_2.RedisModule.register()]
    })
], CheckStatusModule);
exports.CheckStatusModule = CheckStatusModule;


/***/ }),
/* 38 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckStatusController = void 0;
const common_1 = __webpack_require__(1);
const status_service_1 = __webpack_require__(39);
let CheckStatusController = class CheckStatusController {
    constructor(checkStatusService) {
        this.checkStatusService = checkStatusService;
    }
    checkSubmissionStatus(submissionId) {
        return this.checkStatusService.submissionStatus(submissionId);
    }
};
__decorate([
    (0, common_1.Get)(':id([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CheckStatusController.prototype, "checkSubmissionStatus", null);
CheckStatusController = __decorate([
    (0, common_1.Controller)('status'),
    __metadata("design:paramtypes", [typeof (_a = typeof status_service_1.CheckStatusService !== "undefined" && status_service_1.CheckStatusService) === "function" ? _a : Object])
], CheckStatusController);
exports.CheckStatusController = CheckStatusController;


/***/ }),
/* 39 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckStatusService = void 0;
const common_1 = __webpack_require__(9);
const cache_manager_1 = __webpack_require__(25);
const common_2 = __webpack_require__(1);
const cache_manager_2 = __webpack_require__(29);
let CheckStatusService = class CheckStatusService {
    constructor(db, cacheManager) {
        this.db = db;
        this.cacheManager = cacheManager;
    }
    async submissionStatus(submissionId) {
        this.logger = new common_1.AppLogger(submissionId);
        const cachedSubmission = await this.cacheManager.get(submissionId);
        if (cachedSubmission) {
            this.logger.info("DATA RETRIVED CACHE");
            return cachedSubmission;
        }
        const submission = await this.db.executionSubmissions.findUnique({ where: { submission_id: submissionId }
        });
        this.logger.info("NOT FOUND IN DATABASE");
        if (submission == null)
            throw new common_2.NotFoundException(`Submission with ID ${submissionId} not found.`);
        this.cacheManager.set(submission.submission_id, submission);
        return submission;
    }
};
CheckStatusService = __decorate([
    (0, common_2.Injectable)(),
    __param(1, (0, common_2.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.DatabaseService !== "undefined" && common_1.DatabaseService) === "function" ? _a : Object, typeof (_b = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _b : Object])
], CheckStatusService);
exports.CheckStatusService = CheckStatusService;


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RequestMiddleware_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestMiddleware = void 0;
const common_1 = __webpack_require__(9);
const common_2 = __webpack_require__(1);
let RequestMiddleware = RequestMiddleware_1 = class RequestMiddleware {
    constructor() {
        this.logger = new common_1.AppLogger(RequestMiddleware_1.name);
    }
    use(req, res, next) {
        const { method, originalUrl, body } = req;
        next();
        const { statusCode, header } = res;
        const logObj = {
            method,
            originalUrl,
            body,
            statusCode,
            header,
        };
        this.logger.info('INCOMING REQUEST', logObj);
    }
};
RequestMiddleware = RequestMiddleware_1 = __decorate([
    (0, common_2.Injectable)()
], RequestMiddleware);
exports.RequestMiddleware = RequestMiddleware;


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("compression");

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
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const api_gateway_module_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const common_2 = __webpack_require__(9);
const compression = __webpack_require__(42);
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_gateway_module_1.ApiGatewayModule, { logger: new common_2.LoggerService().createLogger("api-gateway") });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use(compression());
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('API_GTAEWAY_PORT'));
}
bootstrap();

})();

/******/ })()
;