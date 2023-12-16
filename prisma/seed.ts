import { PrismaClient, Systems } from '@prisma/client';
import seedData from './seedData.json';

const prisma = new PrismaClient();

const validData = seedData.map((dtc) => ({
  codeTitle: dtc.code.title,
  codeDescription: dtc.code.description,
  codeLocation: dtc.code.location,
  systemTitle: dtc.system.title as Systems,
  systemName: dtc.system.subName,
  systemCode: dtc.system.subCode,
}));

async function main() {
  const currentData = await prisma.dtc.findMany();
  if (currentData.length > 0) return;

  for (const dtc of validData) {
    await prisma.dtc.upsert({
      where: { codeTitle: dtc.codeTitle },
      update: {},
      create: dtc,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
