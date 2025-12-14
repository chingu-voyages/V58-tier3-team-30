import { create } from 'zustand';

interface ShowCountryListStore {
  isCountryListDisplayed: boolean;
  hideCountryList: () => void;
  showCountryList: () => void;
}

const useShowCountryListStore = create<ShowCountryListStore>((set) => ({
  isCountryListDisplayed: false,
  hideCountryList: () => set({ isCountryListDisplayed: false }),
  showCountryList: () => set({ isCountryListDisplayed: true }),
}));

export function useShowCountryList() {
  const isCountryListDisplayed = useShowCountryListStore(
    (state) => state.isCountryListDisplayed
  );

  const hideCountryList = useShowCountryListStore(
    (state) => state.hideCountryList
  );

  const showCountryList = useShowCountryListStore(
    (state) => state.showCountryList
  );

  return {
    isCountryListDisplayed,
    hideCountryList,
    showCountryList,
  };
}
