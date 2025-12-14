import { create } from 'zustand';

interface FilterCriteria {
  gender?: string;
  countryCode?: string;
  countryName?: string;
  timezone?: string;
  goal?: string;
  goalOther?: string;
  source?: string;
  sourceOther?: string;
  soloProjectTier?: string;
  roleType?: string;
  voyageRole?: string;
  voyageSignup?: string;
  voyageTier?: string;
  [key: string]: string | undefined;
}

interface FilterStore {
  filters: FilterCriteria;
  setFilter: (key: string, value: string | undefined) => void;
  setFilters: (filters: FilterCriteria) => void;
  clearFilters: () => void;
  clearFilter: (key: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
  clearFilter: (key) =>
    set((state) => {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { [key]: _removed, ...rest } = state.filters;
      return { filters: rest };
    }),
}));
