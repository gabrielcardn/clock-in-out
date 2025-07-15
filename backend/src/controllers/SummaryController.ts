import { Request, Response } from 'express';
import { SummaryService } from '../services/SummaryService';

export class SummaryController {
  public async getDailySummary(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request.params;

      const summaryService = new SummaryService();
      const summary = await summaryService.getDailySummary(userId);

      return response.json(summary);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

   public async getHistory(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request.params;

      const summaryService = new SummaryService();
      const history = await summaryService.getHistory(userId);

      return response.json(history);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}