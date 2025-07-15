import { prisma } from '../database/prismaClient';

export class ShiftService {
  public async start(userId: string) {
    const activeShift = await prisma.timeEntry.findFirst({
      where: {
        userId: userId,
        endTime: null,
      },
    });

    if (activeShift) {
      throw new Error('User already has an active shift.');
    }

    const newShift = await prisma.timeEntry.create({
      data: {
        startTime: new Date(),
        userId: userId,
      },
    });

    return newShift;
  }

  public async end(userId: string) {
    const activeShift = await prisma.timeEntry.findFirst({
      where: {
        userId: userId,
        endTime: null,
      },
    });

    if (!activeShift) {
      throw new Error('User does not have an active shift to end.');
    }

    const finishedShift = await prisma.timeEntry.update({
      where: {
        id: activeShift.id,
      },
      data: {
        endTime: new Date(),
      },
    });

    return finishedShift;
  }
}
