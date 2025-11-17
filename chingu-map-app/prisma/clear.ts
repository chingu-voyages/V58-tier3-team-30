import prisma from '../src/db';

async function main() {
  await prisma.chingu.deleteMany();

  console.log('✅ Database cleared.');
}

main()
  .catch((e) => {
    console.error('❌ Clear failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
