import { prisma } from '../database/prismaClient';

export class SummaryService {
  public async getDailySummary(userId: string) {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    const timeEntriesToday = await prisma.timeEntry.findMany({
      where: {
        userId: userId,
        startTime: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    let totalMilliseconds = 0;
    let activeShift = null;

    for (const entry of timeEntriesToday) {
      if (entry.endTime) {
        totalMilliseconds +=
          entry.endTime.getTime() - entry.startTime.getTime();
      } else {
        activeShift = entry;
      }
    }

    return {
      totalSecondsToday: Math.floor(totalMilliseconds / 1000),
      activeShift: activeShift,
    };
  }

  public async getHistory(userId: string) {
    const finishedEntries = await prisma.timeEntry.findMany({
      where: {
        userId: userId,
        endTime: {
          not: null,
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });

    if (!finishedEntries.length) {
      return [];
    }

    const dailyTotals = finishedEntries.reduce(
      (acc, entry) => {
        const date = entry.startTime.toISOString().split('T')[0];
        const duration = entry.endTime!.getTime() - entry.startTime.getTime();

        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += duration;

        return acc;
      },
      {} as Record<string, number>,
    );

    const history = Object.entries(dailyTotals).map(
      ([date, totalMilliseconds]) => ({
        date: date,
        totalSeconds: Math.floor(totalMilliseconds / 1000),
      }),
    );

    return history;
  }
}
