"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = require("./userRoutes"); 
const routes = (0, express_1.Router)();

routes.use(userRoutes_1.userRoutes);
exports.default = routes;
