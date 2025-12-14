import { create } from 'zustand';

interface SelectedCountryStore {
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
}

const useSelectedCountryStore = create<SelectedCountryStore>((set) => ({
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
}));

export function useSelectedCountry() {
  const selectedCountry = useSelectedCountryStore(
    (state) => state.selectedCountry
  );

  const setSelectedCountry = useSelectedCountryStore(
    (state) => state.setSelectedCountry
  );

  return {
    selectedCountry,
    setSelectedCountry,
  };
}
