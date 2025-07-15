import { Request, Response } from 'express';
import { ShiftService } from '../services/ShiftService';

export class ShiftController {
  public async start(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request.body;

      if (!userId) {
        return response.status(400).json({ message: 'userId is required.' });
      }

      const shiftService = new ShiftService();
      const shift = await shiftService.start(userId);

      return response.status(201).json(shift);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async end(request: Request, response: Response): Promise<Response> {
    try {
      const { userId } = request.body;

      if (!userId) {
        return response.status(400).json({ message: 'userId is required.' });
      }

      const shiftService = new ShiftService();
      const shift = await shiftService.end(userId);

      return response.json(shift);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
