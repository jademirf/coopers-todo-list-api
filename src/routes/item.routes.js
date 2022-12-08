"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoutes = void 0;
const Item = __importStar(require("../controllers/item"));
const authenticate_1 = require("../plugins/authenticate");
async function itemRoutes(fastify) {
    fastify.post('/items', {
        onRequest: [authenticate_1.authenticate],
    }, Item.create);
    fastify.patch('/items/:id', {
        onRequest: [authenticate_1.authenticate],
    }, Item.update);
    fastify.get('/items/lists/:listId', {
        onRequest: [authenticate_1.authenticate],
    }, Item.list);
    fastify.delete('/items/:id', {
        onRequest: [authenticate_1.authenticate],
    }, Item.deleteOne);
    fastify.delete('/items/lists/:listId', {
        onRequest: [authenticate_1.authenticate],
    }, Item.deleteAll);
}
exports.itemRoutes = itemRoutes;
