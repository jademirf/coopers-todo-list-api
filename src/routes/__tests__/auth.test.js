"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tap_1 = require("tap");
const faker_1 = require("@faker-js/faker");
const prisma_1 = require("../../lib/prisma");
const server_1 = __importDefault(require("../../server"));
(0, tap_1.test)('Login user successfully', async (t) => {
    // start fastify
    const fastify = (0, server_1.default)();
    // create an user 
    const name = faker_1.faker.name.firstName();
    const email = faker_1.faker.internet.email();
    const password = faker_1.faker.internet.password();
    const userResponse = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: {
            email,
            name,
            password,
        }
    });
    const signInResponse = await fastify.inject({
        method: 'POST',
        url: '/signin',
        payload: {
            email,
            password,
        }
    });
    t.teardown(async () => {
        fastify.close();
        await prisma_1.prisma.user.deleteMany({});
    });
    t.equal(signInResponse.statusCode, 200);
    t.equal(userResponse.statusCode, 201);
    t.type(signInResponse.json().token, 'string');
});
