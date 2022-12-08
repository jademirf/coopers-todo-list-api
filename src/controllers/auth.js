"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authenticate_1 = require("../plugins/authenticate");
const server_1 = __importDefault(require("../server"));
const signIn = async (req, res) => {
    const fastify = (0, server_1.default)();
    const authUserBody = zod_1.z.object({
        email: zod_1.z.string().min(5),
        password: zod_1.z.string().min(6)
    });
    const { email, password } = authUserBody.parse(req.body);
    const user = await prisma_1.prisma.user.findUnique({ where: {
            email,
        } });
    if (!user) {
        return res.status(400).send('user not found');
    }
    const isPasswordValid = await (0, authenticate_1.verifyHash)(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Informmed user or password is wrong');
    }
    const token = req.jwt.sign({
        email
    }, fastify.secret);
    return res.status(200).send({ email: user.email, token: token });
};
exports.signIn = signIn;
