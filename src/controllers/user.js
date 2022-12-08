"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.show = exports.remove = exports.list = exports.create = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authenticate_1 = require("../plugins/authenticate");
const create = async (request, response) => {
    const createUserBody = zod_1.z.object({
        name: zod_1.z.string().min(3),
        email: zod_1.z.string().min(3),
        password: zod_1.z.string().min(6),
    });
    const { name, email, password } = createUserBody.parse(request.body);
    const hashedPassword = await (0, authenticate_1.genHash)(password);
    try {
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        response.status(201).send(user);
    }
    catch (err) {
        console.log('🚀 ~ file: user.controller.ts ~ line 22 ~ create ~ err', err);
        response.status(400).send(err);
    }
};
exports.create = create;
const update = async (request, response) => {
    const getUserParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getUserParams.parse(request.params);
    const createUserBody = zod_1.z.object({
        name: zod_1.z.string().min(3),
        email: zod_1.z.string().min(3),
        password: zod_1.z.string().min(6),
    });
    const { name, email, password } = createUserBody.parse(request.body);
    const hashedPassword = await (0, authenticate_1.genHash)(password);
    try {
        const user = await prisma_1.prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        response.status(204).send(user);
    }
    catch (err) {
        console.log("🚀 ~ file: user.ts:61 ~ update ~ err", err);
        response.status(400).send(err);
    }
};
exports.update = update;
const list = async (request, response) => {
    const users = await prisma_1.prisma.user.findMany({
        select: {
            id: true,
            email: true,
            lists: true,
        }
    });
    return users;
};
exports.list = list;
const show = async (request, response) => {
    const getUserParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getUserParams.parse(request.params);
    const user = await prisma_1.prisma.user.findUnique({
        where: { id }
    });
    response.send(user);
};
exports.show = show;
const remove = async (request, response) => {
    const getUserParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getUserParams.parse(request.params);
    try {
        await prisma_1.prisma.user.delete({
            where: { id }
        });
        response.status(204);
    }
    catch (err) {
        console.log("🚀 ~ file: user.ts:106 ~ remove ~ err", err);
        response.status(400).send(err);
    }
};
exports.remove = remove;
