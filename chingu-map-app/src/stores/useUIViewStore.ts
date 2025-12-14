import { create } from 'zustand';

type UIView = 'home' | 'map' | 'list';

interface UIViewStore {
  view: UIView;
  setView: (view: UIView) => void;
}

const useUIViewStore = create<UIViewStore>((set) => ({
  view: 'home',
  setView: (view) => set({ view }),
}));

export function useUIView() {
  const currentView = useUIViewStore((state) => state.view);
  const setView = useUIViewStore((state) => state.setView);

  const showHomeView = () => setView('home');
  const showMapView = () => setView('map');
  const showListView = () => setView('list');

  return {
    currentView,
    showHomeView,
    showMapView,
    showListView,
  };
}
