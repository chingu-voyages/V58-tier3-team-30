import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
