import { prisma } from '../database/prismaClient';

interface IUserCreateDTO {
  name: string;
  email: string;
  code: string;
}

export class UserService {
  public async create({ name, email, code }: IUserCreateDTO) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('User with this email already exists.');
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        code,
      },
    });

    return user;
  }
  public async findByCode(code: string) {
    const user = await prisma.user.findUnique({
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
