"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tap_1 = require("tap");
const server_1 = __importDefault(require("../server"));
(0, tap_1.test)('request the `/check` route', async (t) => {
    t.plan(2);
    const fastify = (0, server_1.default)();
    t.teardown(() => {
        fastify.close();
    });
    const response = await fastify.inject({
        method: 'GET',
        url: '/check'
    });
    t.equal(response.statusCode, 200);
    t.same(response.json(), { message: 'It works!' });
});
