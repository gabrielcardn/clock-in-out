'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const prismaClient_1 = require('../database/prismaClient');
class UserService {
  async create({ name, email, code }) {
    const userAlreadyExists = await prismaClient_1.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userAlreadyExists) {
      throw new Error('User with this email already exists.');
    }

    const user = await prismaClient_1.prisma.user.create({
      data: {
        name,
        email,
        code,
      },
    });
    return user;
  }
  async findByCode(code) {
    const user = await prismaClient_1.prisma.user.findUnique({
      where: {
        code,
      },
    });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }
}
exports.UserService = UserService;
