"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const server = (0, server_1.default)();
async function main() {
    let PORT = 3333;
    PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    try {
        server.listen({
            port: PORT,
        });
        console.log(`Server ready at http://localhost:${PORT}`);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}
main();
