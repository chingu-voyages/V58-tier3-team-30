'use client';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import { useFilterStore } from '@/stores/useFilterStore';
import { useChinguStats } from '@/hooks/useChinguStats';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import ReactCountryFlag from 'react-country-flag';
import { getCountryData } from '@/lib/geo';
import { ChevronRight, X, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { useFilteredChingus } from '@/hooks/useFilteredChingus';
import { VirtualizedChinguList } from './VirtualizedChinguList';

export const CountryOverview = () => {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const { clearFilter, filters } = useFilterStore();
  const [viewChingus, setViewChingus] = useState<boolean>(false);
  const { filteredChingus } = useFilteredChingus();

  const toggleViewChingus = () => {
    setViewChingus((prev) => !prev);
  };

  const stats = useChinguStats();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      clearFilter('countryName');
      setSelectedCountry(null);
    }
  };

  if (!selectedCountry) return null;

  const countryData = getCountryData(selectedCountry);

  return (
    <Dialog open={!!selectedCountry} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-[75vh] flex flex-col fixed bottom-12 top-auto translate-y-0 pt-4 bg-chingu-blue-600 border-chingu-blue-300 rounded-3xl [&>button]:text-chingu-blue-100 px-0 gap-0">
        <DialogHeader className="gap-4 flex flex-row items-center px-6 pb-2">
          <div className="rounded-full p-2 bg-chingu-green-600">
            {countryData?.cca2 || countryData?.cca3 ? (
              <ReactCountryFlag
                countryCode={countryData.cca2 || countryData.cca3}
                svg
                style={{
                  fontSize: '1.8rem',
                  lineHeight: '1.8rem',
                }}
              />
            ) : null}
          </div>

          <DialogTitle className="text-left font-bold text-xl text-white">
            {selectedCountry}
          </DialogTitle>
        </DialogHeader>

        {/* Count summary */}
        {!viewChingus && (
          <div
            className="text-white flex items-center gap-2 px-6 bg-chingu-blue-500 py-2 border-b border-b-chingu-blue-400"
            onClick={toggleViewChingus}
          >
            <h4 className="text-white text-lg font-semibold">
              Number of Chingus:{' '}
            </h4>
            {Object.keys(filters).length > 0 ? (
              <span className="flex items-center gap-1 text-chingu-green-100 font-bold">
                <Users size={16} strokeWidth={3} />
                {stats.summary.filtered}
                <span className="font-medium text-chingu-green-300">
                  / {stats.summary.total}
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-2 text-chingu-green-100 font-bold">
                <Users size={16} strokeWidth={3} />
                {stats.summary.total}
              </span>
            )}
            <ChevronRight className="text-chingu-blue-100 ml-auto" />
          </div>
        )}

        {/* Member list header */}
        {viewChingus && (
          <div
            className="text-white flex items-center gap-2 px-6 bg-chingu-blue-500 py-2 border-b border-b-chingu-blue-400 relative"
            onClick={toggleViewChingus}
          >
            <div className="text-chingu-blue-100 flex gap-1 absolute left-6">
              <ChevronLeft />
              <p>Back</p>
            </div>
            <h4 className="text-white text-lg font-semibold w-full text-center">
              Chingu List
            </h4>
          </div>
        )}

        {/* Filter summary */}
        {!viewChingus && Object.keys(filters).length > 0 ? (
          <div className="flex flex-col gap-1 px-6 bg-chingu-green-600 border-b border-b-chingu-green-400 py-3">
            <h5 className="font-semibold text-chingu-green-100">Filters</h5>
            <div className="flex gap-2">
              {Object.entries(filters).map(([filter, value]) => (
                <Badge
                  key={filter}
                  onClick={() => clearFilter(filter)}
                  className="text-white text-sm bg-chingu-green-400"
                >
                  <span className="capitalize">
                    {value?.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </span>
                  <X size={12} />
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        {/* Data breakdown */}
        {!viewChingus && (
          <div className="flex gap-4 flex-col overflow-auto scrollbar-hide flex-1 px-6 py-4">
            {Object.entries(stats.counts).map(([category, counts]) => {
              if (category in filters) return null;
              const hasAnyCounts = Object.values(counts).some((val) => val > 0);
              if (!hasAnyCounts) return null;

              return (
                <div key={category} className="flex flex-col">
                  <h4 className="capitalize font-semibold mb-1 text-chingu-blue-100">
                    {category.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </h4>

                  {Object.entries(counts).map(([key, val]) => {
                    const filteredTotal = stats.summary.filtered;

                    const percentOfFiltered =
                      filteredTotal > 0 ? (val / filteredTotal) * 100 : 0;

                    return (
                      <div key={key} className="flex flex-col gap-1 mb-2">
                        <div className="flex flex-row justify-between">
                          <div className="flex gap-2">
                            <p className="truncate text-white flex items-center gap-2 max-w-50">
                              {key}
                            </p>
                            <p className="flex items-center gap-2 text-chingu-green-200">
                              <Users size={16} strokeWidth={3} />
                              {val}
                            </p>
                          </div>
                          <p className="text-sm text-white">
                            {percentOfFiltered.toFixed()}%
                          </p>
                        </div>
                        <Progress
                          value={percentOfFiltered}
                          className="progress-track bg-input"
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* Chingu List */}
        {viewChingus && <VirtualizedChinguList chingus={filteredChingus} />}
      </DialogContent>
    </Dialog>
  );
};
