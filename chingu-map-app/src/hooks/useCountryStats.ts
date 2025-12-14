import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

export const useCountryStats = () => {
  return useQuery({
    queryKey: ['countryStats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/chingu/country-stats');
      return response.data;
    },
  });
};
