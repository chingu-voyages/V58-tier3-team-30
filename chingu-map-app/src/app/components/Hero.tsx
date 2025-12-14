'use client';
import { Button } from '@/components/ui/button';
import { useUIView } from '@/stores/useUIViewStore';

export const Hero = () => {
  const { currentView, showMapView } = useUIView();

  if (currentView !== 'home') return;

  return (
    <div className="flex flex-col gap-10 justify-start items-center mb-10 pointer-events-auto">
      <h1 className="text-4xl text-center text-white md:mt-20 lg:mt-30 font-bold">
        Find your fellow Chingus around the world
      </h1>
      <Button
        onClick={showMapView}
        className="rounded-full text-lg text-black px-10 py-6 bg-chingu-green-100 hover:bg-chingu-green-100"
      >
        Explore Now
      </Button>
    </div>
  );
};
