"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./auth.routes");
const list_routes_1 = require("./list.routes");
const item_routes_1 = require("./item.routes");
const user_routes_1 = require("./user.routes");
exports.default = (fastify) => {
    (0, auth_routes_1.authRoutes)(fastify);
    (0, list_routes_1.listRoutes)(fastify);
    (0, item_routes_1.itemRoutes)(fastify);
    (0, user_routes_1.userRoutes)(fastify);
};
