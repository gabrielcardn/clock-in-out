'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.userRoutes = void 0;
const express_1 = require('express');
const UserController_1 = require('../controllers/UserController');
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const userController = new UserController_1.UserController();

userRoutes.get('/users/by-code/:code', userController.findByCode);
