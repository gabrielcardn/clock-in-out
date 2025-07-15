import { Router } from 'express';
import { ShiftController } from '../controllers/ShiftController';

const shiftRoutes = Router();
const shiftController = new ShiftController();

shiftRoutes.post('/shifts/start', shiftController.start);

shiftRoutes.patch('/shifts/end', shiftController.end);

export { shiftRoutes };