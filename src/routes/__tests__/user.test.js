"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const tap_1 = require("tap");
const prisma_1 = require("../../lib/prisma");
const server_1 = __importDefault(require("../../server"));
(0, tap_1.test)('Test if user is created successfully', async (t) => {
    t.plan(3);
    const name = faker_1.faker.name.firstName();
    const email = faker_1.faker.internet.email();
    const password = faker_1.faker.internet.password();
    const fastify = (0, server_1.default)();
    t.teardown(async () => {
        fastify.close();
        await prisma_1.prisma.user.deleteMany({});
    });
    const response = await fastify.inject({
        method: 'POST',
        url: 'users',
        payload: {
            email,
            name,
            password,
        }
    });
    const user = response.json();
    t.equal(response.statusCode, 201);
    t.equal(user.name, name);
    t.equal(user.email, email);
});
