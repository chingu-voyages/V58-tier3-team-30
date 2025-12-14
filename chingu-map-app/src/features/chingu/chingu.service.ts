import prisma from '../../db';
import {
  ChinguQueryOptions,
  ChinguType,
  ChinguCountryStats,
  ChinguCountryRoleStats,
  ChinguRoleCount,
  ChinguWhereInput,
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
      count: r._count._all ?? 0,
    }));
  },
  getRoleCountsForCountry: async (params: {
    countryCode?: string;
    countryName?: string;
  }): Promise<ChinguCountryRoleStats> => {
    try {
      const { countryCode, countryName } = params;

      const where: ChinguWhereInput = {};

      if (countryCode) {
        where.countryCode = { equals: countryCode, mode: 'insensitive' };
      }

      if (countryName) {
        where.countryName = { equals: countryName, mode: 'insensitive' };
      }

      const meta = await prisma.chingu.findFirst({
        where,
        select: { countryName: true, countryCode: true },
      });

      const rows = await prisma.chingu.groupBy({
        by: ['voyageRole'],
        where,
        _count: { id: true },
        orderBy: [{ _count: { id: 'desc' } }],
      });

      const roles: ChinguRoleCount[] = rows.map((r) => ({
        voyageRole: r.voyageRole,
        count: r._count?.id ?? 0,
      }));

      const total = roles.reduce((acc, r) => acc + r.count, 0);

      return {
        countryName: meta?.countryName ?? countryName ?? null,
        countryCode: meta?.countryCode ?? countryCode ?? null,
        total,
        roles,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to get role counts for country: Unknown error');
    }
  },
};
