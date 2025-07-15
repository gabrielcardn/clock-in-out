import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { shiftRoutes } from './shiftRoutes';
import { summaryRoutes } from './summaryRoutes';

const routes = Router();

routes.use(userRoutes);
routes.use(shiftRoutes);
routes.use(summaryRoutes);

export default routes;