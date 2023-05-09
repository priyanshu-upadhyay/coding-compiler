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
exports.BackendEngineModule = void 0;
const common_1 = __webpack_require__(3);
const backend_engine_controller_1 = __webpack_require__(4);
const backend_engine_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(9);
const common_2 = __webpack_require__(6);
const Joi = __webpack_require__(43);
const helpers_1 = __webpack_require__(25);
const core_1 = __webpack_require__(1);
const exceptions_1 = __webpack_require__(44);
let BackendEngineModule = class BackendEngineModule {
};
BackendEngineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    RABBIT_MQ_URI: Joi.string().required(),
                    RABBIT_MQ_CODE_EXECUTION_QUEUE: Joi.string().required(),
                    RABBIT_MQ_PREFETCH: Joi.number(),
                    REDIS_URL: Joi.string().required(),
                    REDIS_TTL: Joi.number().required(),
                }),
                envFilePath: '.env',
            }),
            common_2.RmqModule,
            common_2.DatabaseModule,
            common_2.RedisModule.register()
        ],
        controllers: [backend_engine_controller_1.BackendEngineController],
        providers: [
            backend_engine_service_1.BackendEngineService,
            common_2.DatabaseService,
            helpers_1.DockerService,
            helpers_1.DirectoryManager,
            { provide: core_1.APP_FILTER, useClass: exceptions_1.GlobalExceptionsFilter }
        ]
    })
], BackendEngineModule);
exports.BackendEngineModule = BackendEngineModule;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendEngineController = void 0;
const backend_engine_service_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(12);
const common_2 = __webpack_require__(6);
const client_1 = __webpack_require__(10);
const cache_manager_1 = __webpack_require__(42);
const cache_manager_2 = __webpack_require__(24);
let BackendEngineController = class BackendEngineController {
    constructor(backendEngineService, db, cacheManager, rmqService) {
        this.backendEngineService = backendEngineService;
        this.db = db;
        this.cacheManager = cacheManager;
        this.rmqService = rmqService;
    }
    async handleSubmissionCreated(submissionId, context) {
        this.logger = new common_2.AppLogger(submissionId);
        try {
            await this.backendEngineService.executeSubmission(submissionId);
        }
        catch (error) {
            this.logger.error("PROCESSING", error);
            const execute = await this.db.executionSubmissions.update({ where: { submission_id: submissionId },
                data: { submission_status: client_1.SubmissionStatus.FAILURE, metadata: JSON.stringify(error) }
            });
            await this.cacheManager.set(execute.submission_id, execute);
        }
        await this.rmqService.ack(context);
    }
};
__decorate([
    (0, microservices_1.EventPattern)(common_2.EMIT_SUBMISSION),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], BackendEngineController.prototype, "handleSubmissionCreated", null);
BackendEngineController = __decorate([
    (0, common_1.Controller)(),
    __param(2, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof backend_engine_service_1.BackendEngineService !== "undefined" && backend_engine_service_1.BackendEngineService) === "function" ? _a : Object, typeof (_b = typeof common_2.DatabaseService !== "undefined" && common_2.DatabaseService) === "function" ? _b : Object, typeof (_c = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _c : Object, typeof (_d = typeof common_2.RmqService !== "undefined" && common_2.RmqService) === "function" ? _d : Object])
], BackendEngineController);
exports.BackendEngineController = BackendEngineController;


/***/ }),
/* 5 */
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendEngineService = void 0;
const common_1 = __webpack_require__(3);
const common_2 = __webpack_require__(6);
const client_1 = __webpack_require__(10);
const helpers_1 = __webpack_require__(25);
const functions_1 = __webpack_require__(36);
const cache_manager_1 = __webpack_require__(42);
const cache_manager_2 = __webpack_require__(24);
let BackendEngineService = class BackendEngineService {
    constructor(db, dirService, dockerService, cacheManager) {
        this.db = db;
        this.dirService = dirService;
        this.dockerService = dockerService;
        this.cacheManager = cacheManager;
    }
    async executeSubmission(submissionId) {
        this.logger = new common_2.AppLogger(submissionId);
        let execute;
        execute = await this.cacheManager.get(submissionId);
        if (execute == null) {
            this.logger.info("DATA RETRIVED FROM DATABASE");
            execute = await this.db.executionSubmissions.findUniqueOrThrow({ where: { submission_id: submissionId } });
        }
        else {
            this.logger.info("DATA FOUND FROM CACHE");
        }
        const inputArraySize = execute.input_array.length;
        const languageScript = new helpers_1.ScriptGenerator(execute.programming_language);
        execute = await this.db.executionSubmissions.update({ where: { submission_id: submissionId },
            data: { submission_status: client_1.SubmissionStatus.IN_PROCESS }
        });
        await this.cacheManager.set(execute.submission_id, execute);
        this.logger.info("DATA CACHED");
        const { basePath, submissionPath, resultPath } = this.dirService.getAndCreateFoldersForExecution();
        this.dirService.writeTestCases((0, functions_1.decodeBase64ArrayOfStrings)(execute.input_array));
        this.dirService.writeFileWithName((0, functions_1.decodeBase64String)(execute.source_code), `main${languageScript.getFileExtension()}`);
        const workingDir = "/compiler";
        const containerName = `online-compiler-${execute.submission_id}-0`;
        const containerId = await this.dockerService.createContainer(languageScript.getDockerImageName(), containerName, workingDir);
        this.logger.info("CONTAINER CREATED", { containerName: containerName, containerId: containerId });
        await this.dockerService.copyToContainer(containerId, submissionPath, "/");
        await this.dockerService.startContainer(containerId);
        const insideBashOutput = await this.dockerService.execInContainer(containerId, ['bash', '-c', languageScript.getEndpointFileContent(inputArraySize)]);
        await this.dockerService.copyFromContainer(containerId, `${workingDir}/result`, submissionPath);
        this.logger.info("CONTINER OUTPUT", insideBashOutput);
        if (insideBashOutput.exitCode == 2) {
            const compilationError = await (0, functions_1.handleCompilationErrorResponse)(resultPath);
            execute = await this.db.executionSubmissions.update({ where: { submission_id: submissionId },
                data: { submission_status: client_1.SubmissionStatus.SUCCESS, compilation_error: compilationError }
            });
        }
        else if (insideBashOutput.exitCode == 0) {
            const { executionStatus, executionTime, executionOutput } = await (0, functions_1.handleSuccessExecutionResponse)(resultPath);
            execute = await this.db.executionSubmissions.update({ where: { submission_id: submissionId },
                data: { submission_status: client_1.SubmissionStatus.SUCCESS, execution_output: executionOutput, execution_status: executionStatus, execution_time: executionTime }
            });
        }
        else {
            execute = await this.db.executionSubmissions.update({ where: { submission_id: submissionId },
                data: { submission_status: client_1.SubmissionStatus.FAILURE, metadata: JSON.stringify(insideBashOutput) }
            });
        }
        await this.cacheManager.set(execute.submission_id, execute);
        this.logger.info("DATA CACHED");
        try {
            await this.dockerService.removeContainer(containerId);
        }
        catch (error) {
            this.logger.error("FAILED TO REMOVE CONTAINER", error);
        }
        try {
            this.dirService.deleteFolder(basePath);
        }
        catch (error) {
            this.logger.error("FAILED TO REMOVE EXECUTION TEMP FOLDER", error);
        }
        this.logger.info("TASK COMPLETED");
    }
};
BackendEngineService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof common_2.DatabaseService !== "undefined" && common_2.DatabaseService) === "function" ? _a : Object, typeof (_b = typeof helpers_1.DirectoryManager !== "undefined" && helpers_1.DirectoryManager) === "function" ? _b : Object, typeof (_c = typeof helpers_1.DockerService !== "undefined" && helpers_1.DockerService) === "function" ? _c : Object, typeof (_d = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _d : Object])
], BackendEngineService);
exports.BackendEngineService = BackendEngineService;


/***/ }),
/* 6 */
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
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 7 */
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
const database_service_1 = __webpack_require__(8);
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
/* 8 */
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
const config_1 = __webpack_require__(9);
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(10);
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
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@prisma/client");

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
var RmqService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(9);
const microservices_1 = __webpack_require__(12);
const common_2 = __webpack_require__(6);
const os = __webpack_require__(13);
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
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 14 */
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
const config_1 = __webpack_require__(9);
const microservices_1 = __webpack_require__(12);
const rmq_service_1 = __webpack_require__(11);
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
/* 15 */
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
__exportStar(__webpack_require__(16), exports);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMIT_SUBMISSION = exports.EXECUTION_SERVICE = void 0;
const EXECUTION_SERVICE = "CODE_EXECUTION";
exports.EXECUTION_SERVICE = EXECUTION_SERVICE;
const EMIT_SUBMISSION = "SUBMISSION";
exports.EMIT_SUBMISSION = EMIT_SUBMISSION;


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
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(3);
const logger_service_1 = __webpack_require__(18);
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
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppLogger = exports.LoggerService = void 0;
const nest_winston_1 = __webpack_require__(19);
const winston_1 = __webpack_require__(20);
const common_1 = __webpack_require__(3);
__webpack_require__(21);
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
/* 19 */
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 22 */
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
const redisStore = (__webpack_require__(23).redisStore);
const cache_manager_1 = __webpack_require__(24);
const config_1 = __webpack_require__(9);
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
/* 23 */
/***/ ((module) => {

module.exports = require("cache-manager-redis-store");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 25 */
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
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);


/***/ }),
/* 26 */
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DockerService = void 0;
const common_1 = __webpack_require__(3);
const Dockerode = __webpack_require__(27);
const util_1 = __webpack_require__(28);
const child_process_1 = __webpack_require__(29);
const DockerodeSimple = __webpack_require__(30);
const exec = (0, util_1.promisify)(child_process_1.exec);
let DockerService = class DockerService {
    constructor() {
        this.docker = new Dockerode();
        this.dockerSimple = new DockerodeSimple();
    }
    async createContainer(image, name, workingDir) {
        const defaultConfig = {
            Image: image,
            name,
            Cmd: ['/bin/bash', '-c', 'tail -f /dev/null'],
            HostConfig: {
                Memory: 200 * 1024 * 1024,
            },
            StorageOpt: {
                Size: '100M'
            },
            NetworkDisabled: true,
            WorkingDir: workingDir
        };
        const container = await this.docker.createContainer(defaultConfig);
        return container.id;
    }
    async startContainer(containerId) {
        const container = this.docker.getContainer(containerId);
        await container.start();
    }
    async stopContainer(containerId) {
        const container = this.docker.getContainer(containerId);
        await container.stop();
    }
    async removeContainer(containerId) {
        const container = this.docker.getContainer(containerId);
        await container.remove({ force: true });
    }
    async copyToContainer(containerId, source, destination) {
        const command = `docker cp ${source} ${containerId}:${destination}`;
        await exec(command);
    }
    async copyFromContainer(containerId, source, destination) {
        const command = `docker cp ${containerId}:${source} ${destination}`;
        await exec(command);
    }
    async execInContainer(containerId, command) {
        const container = this.dockerSimple.getContainer(containerId);
        const results = await container.exec(command, { stdout: true, stderr: true });
        return { exitCode: results.inspect.ExitCode, stdout: results.stdout, stderr: results.stderr };
    }
};
DockerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DockerService);
exports.DockerService = DockerService;


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("dockerode");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("simple-dockerode");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScriptGenerator = void 0;
const config_1 = __webpack_require__(9);
class ScriptGenerator {
    constructor(programmingLanguage) {
        this.languageUtils = {
            CPP: {
                compilation: "g++ main.cpp -o exec",
                execution: "./exec",
                extension: ".cpp",
            },
            JAVA: {
                compilation: "javac main.java",
                execution: "java main",
                extension: ".java",
            },
            C: {
                compilation: "gcc -Werror main.c -o exec",
                execution: "./exec",
                extension: ".c",
            },
            PYTHON3: {
                compilation: null,
                execution: "python3 main.py",
                extension: ".py",
            }
        };
        this.programmingLanguage = programmingLanguage;
        this.configService = new config_1.ConfigService;
    }
    isCompilationSupportedLanguage() {
        return (this.languageUtils[this.programmingLanguage].compilation != null);
    }
    getCompilationCommand() {
        return this.languageUtils[this.programmingLanguage].compilation;
    }
    getExecutionCommand() {
        return this.languageUtils[this.programmingLanguage].execution;
    }
    getTimeLimit() {
        return this.configService.get('TIME_LIMIT') || "1s";
    }
    getStackMemoryLimit() {
        return this.configService.get('STACK_MEMORY_LIMIT') || "256000";
    }
    getOutputFileSizeLimit() {
        return this.configService.get('MEMORY_LIMIT') || "10240";
    }
    getFileExtension() {
        return this.languageUtils[this.programmingLanguage].extension;
    }
    getDockerImageName() {
        const imageNameFromConfig = this.configService.get(`${this.programmingLanguage}_IMAGE_NAME`);
        switch (this.programmingLanguage) {
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
    getEndpointFileContent(inputArraySize) {
        let content = "#!/usr/bin/env bash\n";
        if (this.isCompilationSupportedLanguage()) {
            content += `${this.getCompilationCommand()} 2> result/compilation_error.out\n` +
                `ret=$?\nif [ $ret -ne 0 ]\nthen\n  exit 2\nfi\n\n`;
        }
        content += `n=${inputArraySize}     # Number of test cases\n` +
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
exports.ScriptGenerator = ScriptGenerator;


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
var DirectoryManager_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectoryManager = void 0;
const common_1 = __webpack_require__(6);
const common_2 = __webpack_require__(3);
const fs_1 = __webpack_require__(33);
const path = __webpack_require__(34);
const uuid_1 = __webpack_require__(35);
let DirectoryManager = DirectoryManager_1 = class DirectoryManager {
    constructor() {
        this.logger = new common_1.AppLogger(DirectoryManager_1.name);
        const folderPath = path.join(process.cwd(), "temp");
        if (!(0, fs_1.existsSync)(folderPath)) {
            (0, fs_1.mkdirSync)(folderPath, { recursive: true });
        }
        this.tempFolderPath = folderPath;
        this.logger.debug("TEMP FOLDER CREATED", `Path for the Temp folder ${this.tempFolderPath}`);
    }
    getAndCreateFoldersForExecution(submissionFolderName) {
        const folderName = submissionFolderName !== null && submissionFolderName !== void 0 ? submissionFolderName : (0, uuid_1.v4)();
        const basePath = path.join(this.tempFolderPath, folderName);
        const submissionPath = path.join(this.tempFolderPath, `${folderName}/compiler`);
        const resultPath = path.join(this.tempFolderPath, `${folderName}/compiler/result`);
        if (!(0, fs_1.existsSync)(submissionPath)) {
            (0, fs_1.mkdirSync)(resultPath, { recursive: true });
        }
        this.submissionfolderPath = submissionPath;
        this.logger.debug("SUBMISSION FOLDER IS CREATED", this.submissionfolderPath);
        return { basePath, submissionPath, resultPath };
    }
    writeTestCases(fileContents) {
        for (let i = 0; i < fileContents.length; i++) {
            const filePath = `${this.submissionfolderPath}/testcase${i + 1}.in`;
            (0, fs_1.writeFileSync)(filePath, fileContents[i]);
        }
        this.logger.debug("TEST CASES ARE WRITTEN");
    }
    writeFileWithName(fileContent, fileName) {
        const filePath = `${this.submissionfolderPath}/${fileName}`;
        (0, fs_1.writeFileSync)(filePath, fileContent);
        this.logger.debug("FILE HAS BEEN WRITTEN", fileName);
    }
    deleteFolder(path) {
        (0, fs_1.rmSync)(path, { recursive: true, force: true });
        this.logger.debug("FOLDER HAS BEEN DELETED", path);
    }
};
DirectoryManager = DirectoryManager_1 = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [])
], DirectoryManager);
exports.DirectoryManager = DirectoryManager;


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 36 */
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
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(39), exports);
__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeBase64ArrayOfStrings = exports.decodeBase64String = void 0;
function decodeBase64String(encodedString) {
    const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
    return decodedString;
}
exports.decodeBase64String = decodeBase64String;
function decodeBase64ArrayOfStrings(encodedStrings) {
    const decodedStrings = encodedStrings.map(encodedString => Buffer.from(encodedString, 'base64').toString('utf-8'));
    return decodedStrings;
}
exports.decodeBase64ArrayOfStrings = decodeBase64ArrayOfStrings;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.encodeFileBase64String = void 0;
const fs = __webpack_require__(33);
async function encodeFileBase64String(path, fileName) {
    const fileData = fs.readFileSync(`${path}/${fileName}`);
    const encodedFile = fileData.toString('base64');
    return encodedFile;
}
exports.encodeFileBase64String = encodeFileBase64String;


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSuccessExecutionTime = exports.getSuccessExecutionStatus = void 0;
const readline = __webpack_require__(40);
const fs = __webpack_require__(33);
const client_1 = __webpack_require__(10);
async function getSuccessExecutionStatus(filePath) {
    var _a, e_1, _b, _c;
    const status = [];
    const fileStream = fs.createReadStream(`${filePath}/status.out`);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    try {
        for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), _a = rl_1_1.done, !_a;) {
            _c = rl_1_1.value;
            _d = false;
            try {
                const line = _c;
                const code = line.trim();
                if (code !== '') {
                    if (code == "0") {
                        status.push(client_1.ExecutionStatus.SUCCESSFUL_EXECUTION);
                    }
                    else if (code == "1") {
                        status.push(client_1.ExecutionStatus.RUNTIME_ERROR);
                    }
                    else if (code == "2") {
                        status.push(client_1.ExecutionStatus.MEMORY_LIMIT_EXCEEDED);
                    }
                    else if (code == "3") {
                        status.push(client_1.ExecutionStatus.TIME_LIMIT_EXCEEDED);
                    }
                    else if (code == "4") {
                        status.push(client_1.ExecutionStatus.OUTPUT_LIMIT_EXCEEDED);
                    }
                    else {
                        status.push(client_1.ExecutionStatus.UNKNOWN_EXECUTION_ERROR);
                    }
                }
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = rl_1.return)) await _b.call(rl_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return status;
}
exports.getSuccessExecutionStatus = getSuccessExecutionStatus;
async function getSuccessExecutionTime(filePath) {
    var _a, e_2, _b, _c;
    const executionTime = [];
    const fileStream = fs.createReadStream(`${filePath}/execution_time.out`);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    try {
        for (var _d = true, rl_2 = __asyncValues(rl), rl_2_1; rl_2_1 = await rl_2.next(), _a = rl_2_1.done, !_a;) {
            _c = rl_2_1.value;
            _d = false;
            try {
                const line = _c;
                if (line.startsWith('real')) {
                    const timeString = line.split('\t')[1];
                    const [wholeSecondsString, fractionSecondsString] = timeString.split('.');
                    const wholeSeconds = wholeSecondsString ? parseInt(wholeSecondsString) : 0;
                    const fractionSeconds = parseFloat(`0.${fractionSecondsString}`);
                    const totalSeconds = wholeSeconds + fractionSeconds;
                    executionTime.push(`${totalSeconds}s`);
                }
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = rl_2.return)) await _b.call(rl_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return executionTime;
}
exports.getSuccessExecutionTime = getSuccessExecutionTime;


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("readline");

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleSuccessExecutionResponse = exports.handleCompilationErrorResponse = void 0;
const functions_1 = __webpack_require__(36);
const client_1 = __webpack_require__(10);
async function handleCompilationErrorResponse(resultPath) {
    const compilationError = await (0, functions_1.encodeFileBase64String)(resultPath, "compilation_error.out");
    return compilationError;
}
exports.handleCompilationErrorResponse = handleCompilationErrorResponse;
async function handleSuccessExecutionResponse(resultPath) {
    const executionStatus = await (0, functions_1.getSuccessExecutionStatus)(resultPath);
    const executionTime = await (0, functions_1.getSuccessExecutionTime)(resultPath);
    const executionOutput = [];
    for (let i = 0; i < executionStatus.length; i++) {
        if ((executionStatus[i] == client_1.ExecutionStatus.SUCCESSFUL_EXECUTION) || (executionStatus[i] == client_1.ExecutionStatus.RUNTIME_ERROR)) {
            const encodeOutput = await (0, functions_1.encodeFileBase64String)(resultPath, `output${i + 1}.out`);
            executionOutput.push(encodeOutput);
        }
        else {
            executionOutput.push("");
        }
    }
    return { executionStatus, executionTime, executionOutput };
}
exports.handleSuccessExecutionResponse = handleSuccessExecutionResponse;


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("cache-manager");

/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 44 */
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
__exportStar(__webpack_require__(45), exports);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalExceptionsFilter = void 0;
const common_1 = __webpack_require__(6);
const common_2 = __webpack_require__(3);
const microservices_1 = __webpack_require__(12);
let GlobalExceptionsFilter = GlobalExceptionsFilter_1 = class GlobalExceptionsFilter extends microservices_1.BaseRpcExceptionFilter {
    constructor() {
        super(...arguments);
        this.logger = new common_1.AppLogger(GlobalExceptionsFilter_1.name);
    }
    catch(exception, host) {
        this.logger.error("Global Microservice Error", exception);
        return super.catch(exception, host);
    }
};
GlobalExceptionsFilter = GlobalExceptionsFilter_1 = __decorate([
    (0, common_2.Catch)()
], GlobalExceptionsFilter);
exports.GlobalExceptionsFilter = GlobalExceptionsFilter;


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
const backend_engine_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(backend_engine_module_1.BackendEngineModule, { logger: new common_1.LoggerService().createLogger("backend-engine") });
    const rmqService = app.get(common_1.RmqService);
    app.connectMicroservice(rmqService.getOptions(common_1.EXECUTION_SERVICE), { inheritAppConfig: true });
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;