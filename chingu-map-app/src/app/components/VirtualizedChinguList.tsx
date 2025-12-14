/* eslint-disable react-hooks/incompatible-library */

'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Mars, Venus } from 'lucide-react';
import { ChinguType } from '@/features/chingu/chingu.type';

interface VirtualizedChinguListProps {
  chingus: ChinguType[];
}

export const VirtualizedChinguList = ({
  chingus,
}: VirtualizedChinguListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: chingus.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="flex-1 overflow-y-auto scrollbar-hide p-2">
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const chingu = chingus[virtualRow.index];

          return (
            <div
              key={chingu.id}
              ref={rowVirtualizer.measureElement}
              data-index={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="text-white flex flex-col gap-2 border border-chingu-blue-400 rounded-md p-2 mb-2">
                <div className="flex gap-2 items-center">
                  <h4 className="text-chingu-blue-100 font-semibold text-lg">
                    {chingu.voyageRole}
                  </h4>
                  {chingu.gender === 'MALE' && (
                    <Mars size={20} className="text-white" />
                  )}
                  {chingu.gender === 'FEMALE' && (
                    <Venus size={20} className="text-white" />
                  )}
                </div>

                <p>Time Zone: {chingu.timezone ?? 'N/A'}</p>
                <p>
                  Joined:{' '}
                  {chingu.timestamp
                    ? new Date(chingu.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
                <p>Solo Project Tier: {chingu.soloProjectTier ?? 'N/A'}</p>
                <p>Voyage Tier: {chingu.voyageTier ?? 'N/A'}</p>
                <p>Goals: {chingu.goal ?? 'N/A'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
