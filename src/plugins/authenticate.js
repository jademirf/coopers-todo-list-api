"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.genHash = exports.authenticate = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function authenticate(request) {
    await request.jwtVerify();
}
exports.authenticate = authenticate;
async function genHash(password) {
    const hashed = bcrypt_1.default.hash(password, 12);
    return hashed;
}
exports.genHash = genHash;
async function verifyHash(password, hash) {
    const result = bcrypt_1.default.compare(password, hash);
    return result;
}
exports.verifyHash = verifyHash;
