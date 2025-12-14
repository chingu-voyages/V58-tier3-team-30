import { chinguService } from './chingu.service';
import {
  ChinguQueryOptions,
  ChinguType,
  ChinguCountryStats,
  ChinguCountryRoleStats,
} from './chingu.type';

function mapError(e: unknown): Error {
  if (e instanceof Error) return e;
  return new Error('Unknown error');
}

export const chinguController = {
  async list(options: ChinguQueryOptions = {}): Promise<ChinguType[]> {
    try {
      return await chinguService.getAllChingus(options);
    } catch (e) {
      throw mapError(e);
    }
  },

  async get(id: string): Promise<ChinguType> {
    try {
      return await chinguService.getChinguById(id);
    } catch (e) {
      throw mapError(e);
    }
  },

  async countryStats(): Promise<ChinguCountryStats[]> {
    try {
      return await chinguService.getCountsByCountry();
    } catch (e) {
      throw mapError(e);
    }
  },

  async getRoleCountsForCountry(params: {
    countryCode?: string;
    countryName?: string;
  }): Promise<ChinguCountryRoleStats> {
    try {
      if (!params.countryCode && !params.countryName) {
        throw new Error('Either countryCode or countryName is required');
      }

      return await chinguService.getRoleCountsForCountry(params);
    } catch (e) {
      throw mapError(e);
    }
  },
};
