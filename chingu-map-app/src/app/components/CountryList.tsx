'use client';
import { useUIView } from '@/stores/useUIViewStore';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ReactCountryFlag from 'react-country-flag';
import { useMemo } from 'react';
import { countBy } from '@/lib/count';
import { getCountryData } from '@/lib/geo';
import { useFilteredChingus } from '@/hooks/useFilteredChingus';
import { ChevronRight } from 'lucide-react';
import { Users } from 'lucide-react';

export const CountryList = () => {
  const { filteredChingus } = useFilteredChingus();
  const { setSelectedCountry } = useSelectedCountry();
  const { currentView, showMapView } = useUIView();

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    showMapView();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      showMapView();
    }
  };

  const countryCounts = useMemo(() => {
    if (!filteredChingus) return;
    const counts = countBy(filteredChingus, 'countryName');

    return Object.entries(counts);
  }, [filteredChingus]);

  return (
    <Dialog open={currentView === 'list'} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none p-0 fixed left-1/2 top-[25vh] -translate-x-1/2 translate-y-0 h-[90vh] overflow-visible flex flex-col gap-2 [&_button[data-slot='dialog-close']]:hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Countries</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 flex flex-col gap-1 scrollbar-hide rounded-2xl pb-48">
          {countryCounts?.map(([country, count]) => {
            const countryData = getCountryData(country);

            return (
              <div
                key={country}
                className="bg-black border border-chingu-green-400 text-white rounded-3xl px-4 py-3"
                onClick={() => handleCountryClick(country)}
              >
                <div className="flex flex-row gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    <div className="bg-chingu-green-600 rounded-full p-2 w-12 h-12 flex items-center justify-center">
                      {countryData ? (
                        <ReactCountryFlag
                          countryCode={countryData.cca2 || countryData.cca3}
                          svg
                          style={{
                            fontSize: '1.6rem',
                            lineHeight: '1.6rem',
                          }}
                        />
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{country}</h3>
                      <p className="text-sm flex gap-4">
                        Chingus{' '}
                        <span className="text-chingu-green-100 font-semibold flex items-center gap-1">
                          <Users size={16} strokeWidth={3} />
                          {count}
                        </span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-chingu-green-300" />
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
