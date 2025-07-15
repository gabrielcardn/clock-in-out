'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserController = void 0;
const UserService_1 = require('../services/UserService');
class UserController {
  async create(request, response) {
    try {
      const { name, email, code } = request.body;

      const userService = new UserService_1.UserService();

      const user = await userService.create({ name, email, code });

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async findByCode(request, response) {
    try {
      const { code } = request.params;
      const userService = new UserService_1.UserService();
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
exports.UserController = UserController;
