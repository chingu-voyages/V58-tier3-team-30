import { useMemo } from 'react';
import { ChinguType } from '@/features/chingu/chingu.type';
import { useChingus } from '@/hooks/useChingus';
import { useFilteredChingus } from '@/hooks/useFilteredChingus';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import { countBy } from '@/lib/count';

export const useChinguStats = () => {
  const { data: all = [] } = useChingus();
  const { filteredChingus } = useFilteredChingus();
  const { selectedCountry } = useSelectedCountry();

  const { allScoped, filteredScoped } = useMemo(() => {
    if (!selectedCountry) {
      return {
        allScoped: all,
        filteredScoped: filteredChingus,
      };
    }

    const match = (c: ChinguType) => c.countryName === selectedCountry;

    return {
      allScoped: all.filter(match),
      filteredScoped: filteredChingus.filter(match),
    };
  }, [all, filteredChingus, selectedCountry]);

  const stats = useMemo(() => {
    return {
      countries: countBy(filteredScoped, 'countryName'),

      counts: {
        gender: countBy(filteredScoped, 'gender'),
        roleType: countBy(filteredScoped, 'roleType'),
        voyageRole: countBy(filteredScoped, 'voyageRole'),
        soloProjectTier: countBy(filteredScoped, 'soloProjectTier'),
        voyageSignup: countBy(filteredScoped, 'voyageSignup'),
        voyageTier: countBy(filteredScoped, 'voyageTier'),
      },

      totals: {
        gender: countBy(allScoped, 'gender'),
        roleType: countBy(allScoped, 'roleType'),
        voyageRole: countBy(allScoped, 'voyageRole'),
        soloProjectTier: countBy(allScoped, 'soloProjectTier'),
        voyageSignup: countBy(allScoped, 'voyageSignup'),
        voyageTier: countBy(allScoped, 'voyageTier'),
      },

      summary: {
        filtered: filteredScoped.length,
        total: allScoped.length,
      },
    };
  }, [allScoped, filteredScoped]);

  return stats;
};
