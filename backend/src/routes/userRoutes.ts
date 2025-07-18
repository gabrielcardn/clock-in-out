import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', userController.create);

userRoutes.get('/users/by-code/:code', userController.findByCode);

export { userRoutes };