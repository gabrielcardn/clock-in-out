import { Router } from 'express';
import { SummaryController } from '../controllers/SummaryController';

const summaryRoutes = Router();
const summaryController = new SummaryController();

summaryRoutes.get('/summary/today/:userId', summaryController.getDailySummary);

summaryRoutes.get('/summary/history/:userId', summaryController.getHistory);

export { summaryRoutes };