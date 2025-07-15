'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const client_1 = require('@prisma/client');
const prisma = new client_1.PrismaClient();
async function main() {
  console.log('Start seeding ...');

  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Alice Silva',
      email: 'alice.silva@ilumeo.com.br',
      code: '123456',
    },
  });
  await prisma.user.create({
    data: {
      name: 'Bruno Costa',
      email: 'bruno.costa@ilumeo.com.br',
      code: '654321',
    },
  });
  await prisma.user.create({
    data: {
      name: 'Carla Dias',
      email: 'carla.dias@ilumeo.com.br',
      code: '112233',
    },
  });
  console.log('Seeding finished.');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
