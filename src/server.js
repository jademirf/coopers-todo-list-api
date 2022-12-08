"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const env_1 = __importDefault(require("@fastify/env"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = __importDefault(require("./routes"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const schema = {
    type: 'object',
    required: ['PORT', 'JWT_SECRET_KEY'],
    properties: {
        PORT: {
            type: 'number',
            default: 3000,
        },
        JWT_SECRET_KEY: { type: 'string' }
    }
};
function bootstrap() {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'klsjadloipuo234-12k3l12oiu342ll';
    const server = (0, fastify_1.default)({
        logger: {
            level: 'info',
            transport: {
                target: 'pino-pretty'
            }
        }
    });
    server.register(env_1.default, {
        dotenv: true,
        confKey: 'config',
        schema: schema,
    });
    server.register(cors_1.default, {
        origin: true,
    });
    server.get('/check', async () => {
        return { message: 'It works!' };
    });
    server.register(jwt_1.default, {
        secret: JWT_SECRET_KEY
    });
    server.addHook('preHandler', (request, reply, next) => {
        request.jwt = server.jwt;
        return next();
    });
    (0, routes_1.default)(server);
    return server;
}
exports.default = bootstrap;
