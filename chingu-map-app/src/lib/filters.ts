import { ChinguType } from '@/features/chingu/chingu.type';

interface FilterCriteria {
  gender?: string;
  countryCode?: string;
  timezone?: string;
  goal?: string;
  goalOther?: string;
  source?: string;
  sourceOther?: string;
  countryName?: string;
  soloProjectTier?: string;
  roleType?: string;
  voyageRole?: string;
  voyageSignup?: string;
  voyageTier?: string;
}

export function filterChingus(
  chingus: ChinguType[],
  criteria: FilterCriteria
): ChinguType[] {
  return chingus.filter((chingu) => {
    return Object.entries(criteria).every(([key, value]) => {
      if (value === undefined) return true;

      const chinguValue = String(chingu[key as keyof ChinguType]).toLowerCase();
      const filterValue = value.toLowerCase();

      return chinguValue.includes(filterValue);
    });
  });
}
