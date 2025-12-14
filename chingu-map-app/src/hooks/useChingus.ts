import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ChinguOrderByInput, ChinguType } from '@/features/chingu/chingu.type';
import { Chingu } from '@prisma/client';

type ChinguFilters = Partial<Omit<Chingu, 'id' | 'timestamp'>>;

interface UseChingusParams extends ChinguFilters {
  limit?: number;
  offset?: number;
  orderBy?: ChinguOrderByInput;
}

export const useChingus = (params: UseChingusParams = {}) => {
  const { limit, offset, orderBy, ...filters } = params;

  const queryParams: Record<string, string | number> = {};

  if (limit !== undefined) queryParams.limit = limit;
  if (offset !== undefined) queryParams.offset = offset;
  if (orderBy) queryParams.orderBy = JSON.stringify(orderBy);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const trimmed = String(value).trim();
      if (trimmed) {
        queryParams[key] = trimmed;
      }
    }
  });

  return useQuery<ChinguType[]>({
    queryKey: ['chingus', queryParams],
    retry: false,
    queryFn: async () => {
      const response = await axiosInstance.get('/chingu', {
        params: queryParams,
      });
      return response.data;
    },
  });
};
