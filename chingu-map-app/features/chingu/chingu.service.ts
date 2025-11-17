import prisma from '../../db';
import {
  ChinguQueryOptions,
  ChinguType,
  ChinguCountryStats,
} from './chingu.type';

export const chinguService = {
  getAllChingus: async (
    options: ChinguQueryOptions = {}
  ): Promise<ChinguType[]> => {
    try {
      const { where, limit, offset, orderBy } = options;

      return await prisma.chingu.findMany({
        where: where || {},
        ...(limit !== undefined && { take: limit }),
        ...(offset !== undefined && { skip: offset }),
        ...(orderBy && { orderBy }),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Failed to retrieve chingus: Unknown error');
    }
  },
  getChinguById: async (id: string): Promise<ChinguType> => {
    try {
      const chingu = await prisma.chingu.findUnique({
        where: { id },
      });

      if (!chingu) {
        throw new Error('User not found');
      }

      return chingu;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Failed to retrieve chingus: Unknown error');
    }
  },
  getCountsByCountry: async (): Promise<ChinguCountryStats[]> => {
    const rows = await prisma.chingu.groupBy({
      by: ['countryName', 'countryCode'],
      _count: { _all: true },
      orderBy: [{ _count: { countryName: 'desc' } }],
    });

    return rows.map((r) => ({
      countryName: r.countryName,
      countryCode: r.countryCode,
      count: r._count._all,
    }));
  },
};
