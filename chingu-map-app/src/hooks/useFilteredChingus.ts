import { useMemo } from 'react';
import { useChingus } from '@/hooks/useChingus';
import { useFilterStore } from '@/stores/useFilterStore';

export const useFilteredChingus = () => {
  const { data: chingus } = useChingus();
  const { filters } = useFilterStore();

  const filteredChingus = useMemo(() => {
    if (!chingus) return [];

    return chingus.filter((chingu) => {
      const entries = Object.entries(filters);

      for (const [key, value] of entries) {
        if (value === undefined) continue;
        if (!(key in chingu)) continue;
        const chinguValue = chingu[key as keyof typeof chingu];

        if (typeof chinguValue === 'string' && typeof value === 'string') {
          if (chinguValue.toLowerCase() !== value.toLowerCase()) {
            return false;
          }
        } else {
          if (chinguValue !== value) {
            return false;
          }
        }
      }

      return true;
    });
  }, [chingus, filters]);

  return { filteredChingus };
};
