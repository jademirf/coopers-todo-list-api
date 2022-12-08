"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.show = exports.remove = exports.list = exports.create = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const create = async (request, response) => {
    const createListBody = zod_1.z.object({
        title: zod_1.z.string().min(3),
        userId: zod_1.z.string(),
        isActive: zod_1.z.boolean(),
    });
    const { title, userId, isActive = true } = createListBody.parse(request.body);
    try {
        const list = await prisma_1.prisma.list.create({
            data: {
                title,
                ownerId: userId,
                isActive
            }
        });
        response.status(201).send(list);
    }
    catch (err) {
        console.log('🚀 ~ file: list.controller.ts ~ line 22 ~ create ~ err', err);
        response.status(400).send(err);
    }
};
exports.create = create;
const list = async (request, response) => {
    const lists = await prisma_1.prisma.list.findMany({
        select: {
            title: true,
            items: true,
            id: true
        }
    });
    return lists;
};
exports.list = list;
const update = async (request, response) => {
    const getListParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getListParams.parse(request.params);
    const updateListBody = zod_1.z.object({
        title: zod_1.z.string().min(3),
        userId: zod_1.z.string(),
        isActive: zod_1.z.boolean(),
    });
    const { title, userId, isActive = true } = updateListBody.parse(request.body);
    try {
        await prisma_1.prisma.list.update({
            where: {
                id
            },
            data: {
                title,
                ownerId: userId,
                isActive
            }
        });
        response.status(204);
    }
    catch (err) {
        console.log("🚀 ~ file: list.ts:62 ~ update ~ err", err);
        response.status(400).send(err);
    }
};
exports.update = update;
const remove = async (request, response) => {
    const getListParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getListParams.parse(request.params);
    try {
        await prisma_1.prisma.list.delete({
            where: { id }
        });
        response.status(204);
    }
    catch (err) {
        console.log("🚀 ~ file: list.ts:91 ~ remove ~ err", err);
        response.status(400).send(err);
    }
};
exports.remove = remove;
const show = async (request, response) => {
    const getListParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getListParams.parse(request.params);
    try {
        const list = await prisma_1.prisma.list.findUnique({
            where: { id }
        });
        response.status(200).send(list);
    }
    catch (err) {
        console.log("🚀 ~ file: list.ts:91 ~ remove ~ err", err);
        response.status(400).send(err);
    }
};
exports.show = show;
