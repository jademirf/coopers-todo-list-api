"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.list = exports.deleteAll = exports.deleteOne = exports.create = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const create = async (request, response) => {
    const createListItemtBody = zod_1.z.object({
        title: zod_1.z.string().min(3),
        listId: zod_1.z.string(),
        isDone: zod_1.z.boolean(),
    });
    const { title, listId, isDone = true } = createListItemtBody.parse(request.body);
    try {
        const listItem = await prisma_1.prisma.listItem.create({
            data: {
                title,
                listId,
                isDone
            }
        });
        response.status(201).send(listItem);
    }
    catch (err) {
        console.log("🚀 ~ file: item.ts:26 ~ create ~ err", err);
        response.status(400).send(err);
    }
};
exports.create = create;
const list = async (request, response) => {
    const getListItemParams = zod_1.z.object({
        listId: zod_1.z.string(),
    });
    const { listId } = getListItemParams.parse(request.params);
    const listItems = await prisma_1.prisma.listItem.findMany({
        where: {
            listId
        },
        select: {
            title: true,
            isDone: true,
            id: true,
            listId: true,
        }
    });
    return listItems;
};
exports.list = list;
const update = async (request, response) => {
    const getListItemParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getListItemParams.parse(request.params);
    const updateListItemBody = zod_1.z.object({
        title: zod_1.z.string().min(3),
        listId: zod_1.z.string(),
        isDone: zod_1.z.boolean(),
    });
    const { title, listId, isDone = true } = updateListItemBody.parse(request.body);
    try {
        await prisma_1.prisma.listItem.update({
            where: {
                id
            },
            data: {
                title,
                listId,
                isDone
            }
        });
        response.status(204);
    }
    catch (err) {
        console.log("🚀 ~ file: item.ts:81 ~ update ~ err", err);
        response.status(400).send(err);
    }
};
exports.update = update;
const deleteOne = async (request, response) => {
    const getListItemParams = zod_1.z.object({
        id: zod_1.z.string(),
    });
    const { id } = getListItemParams.parse(request.params);
    try {
        await prisma_1.prisma.listItem.delete({
            where: {
                id
            }
        });
        response.status(204);
    }
    catch (err) {
        console.log("🚀 ~ file: item.ts:102 ~ deleteOne ~ err", err);
        response.status(400).send(err);
    }
};
exports.deleteOne = deleteOne;
const deleteAll = async (request, response) => {
    const getListItemParams = zod_1.z.object({
        listId: zod_1.z.string(),
    });
    const { listId } = getListItemParams.parse(request.params);
    try {
        await prisma_1.prisma.listItem.deleteMany({
            where: {
                listId
            }
        });
        response.status(204);
    }
    catch (err) {
        console.log("🚀 ~ file: list.ts:62 ~ update ~ err", err);
        response.status(400).send(err);
    }
};
exports.deleteAll = deleteAll;
