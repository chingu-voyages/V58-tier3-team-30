import { Prisma, Chingu } from '@prisma/client';

export type ChinguOrderByInput = Prisma.ChinguOrderByWithRelationInput;
export type ChinguWhereInput = Prisma.ChinguWhereInput;
export type ChinguType = Chingu;

export interface ChinguQueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: ChinguOrderByInput;
  where?: ChinguWhereInput;
}

export interface ChinguCountryStats {
  countryName: string | null;
  countryCode: string | null;
  count: number;
}

export type ChinguVoyageRole = Chingu['voyageRole'];

export interface ChinguRoleCount {
  voyageRole: ChinguVoyageRole;
  count: number;
}

export interface ChinguCountryRoleStats {
  countryName: string | null;
  countryCode: string | null;
  total: number;
  roles: ChinguRoleCount[];
}
