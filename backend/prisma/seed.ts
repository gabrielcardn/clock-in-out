/// <reference types="node" />

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpa dados antigos para garantir consistência
  await prisma.timeEntry.deleteMany();
  await prisma.user.deleteMany();

  // Cria usuários
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Silva',
      email: 'alice.silva@ilumeo.com.br',
      code: '123456',
    },
  });

  const bruno = await prisma.user.create({
    data: {
      name: 'Bruno Costa',
      email: 'bruno.costa@ilumeo.com.br',
      code: '654321',
    },
  });

  console.log('Seeding users finished.');

  // Adiciona registros de ponto históricos para a Alice
  // Dia: Ontem (8 horas de trabalho)
  await prisma.timeEntry.create({
    data: {
      userId: alice.id,
      startTime: new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem às 11:23
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(new Date().getHours() + 8)), // Ontem, 8 horas depois
    },
  });

  // Dia: Anteontem (2 turnos, total 7h 30m)
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));
  await prisma.timeEntry.create({ // Turno da manhã
    data: {
      userId: alice.id,
      startTime: new Date(twoDaysAgo.setHours(9, 0, 0)), // 9:00
      endTime: new Date(twoDaysAgo.setHours(13, 0, 0)), // 13:00 (4h)
    },
  });
  await prisma.timeEntry.create({ // Turno da tarde
    data: {
      userId: alice.id,
      startTime: new Date(twoDaysAgo.setHours(14, 0, 0)), // 14:00
      endTime: new Date(twoDaysAgo.setHours(17, 30, 0)), // 17:30 (3.5h)
    },
  });
  console.log('Seeding time entries finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });