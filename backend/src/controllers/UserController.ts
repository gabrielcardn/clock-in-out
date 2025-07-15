import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, code } = request.body;

      const userService = new UserService();

      const user = await userService.create({ name, email, code });

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
  public async findByCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { code } = request.params;

      const userService = new UserService();
      const user = await userService.findByCode(code);

      return response.json(user);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return response.status(404).json({ message: error.message });
        }
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
