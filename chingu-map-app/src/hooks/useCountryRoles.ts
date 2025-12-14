import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

interface UseCountryRolesParams {
  countryCode?: string;
  countryName?: string;
}

export const useCountryRoles = ({
  countryCode,
  countryName,
}: UseCountryRolesParams = {}) => {
  const code = countryCode?.trim();
  const name = countryName?.trim();

  const params: Record<string, string> = {};

  if (code) params.code = code;
  if (!code && name) params.name = name;

  return useQuery({
    queryKey: ['countryRoles', code ?? null, !code ? (name ?? null) : null],
    enabled: Boolean(code || name),
    retry: false,
    queryFn: async () => {
      const response = await axiosInstance.get('/chingu/country-roles', {
        params,
      });
      return response.data;
    },
  });
};
