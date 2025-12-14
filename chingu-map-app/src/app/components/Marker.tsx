'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createMarkerElement } from './markerElement';
import { getCountryCoords } from '@/lib/geo';
import { useSelectedCountry } from '@/stores/useSelectedCountry';

interface MarkerProps {
  map: mapboxgl.Map | null;
  country: string;
  count: number;
  zoom?: number;
}

export const Marker = ({ map, country, count, zoom }: MarkerProps) => {
  const { setSelectedCountry } = useSelectedCountry();
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const countryTextRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!map || !country) return;

    const coords = getCountryCoords(country);

    if (!coords) return;

    const el = createMarkerElement(country, count);
    countryTextRef.current = el.querySelector(
      '[data-country-text]'
    ) as HTMLElement;

    el.addEventListener('click', () => setSelectedCountry?.(country));

    markerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([coords.lng, coords.lat])
      .addTo(map);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
        countryTextRef.current = null;
      }
    };
  }, [map, country, count, setSelectedCountry, zoom]);

  useEffect(() => {
    if (!countryTextRef.current || zoom === undefined) return;

    const radiusStops = [
      { count: 1, radius: 10 },
      { count: 5, radius: 15 },
      { count: 20, radius: 25 },
      { count: 50, radius: 35 },
      { count: 100, radius: 50 },
      { count: 150, radius: 65 },
      { count: 300, radius: 80 },
      { count: 600, radius: 95 },
      { count: 1000, radius: 110 },
      { count: 2000, radius: 130 },
    ];

    let radius = radiusStops[0].radius;

    if (count <= radiusStops[0].count) {
      radius = radiusStops[0].radius;
    } else if (count >= radiusStops[radiusStops.length - 1].count) {
      radius = radiusStops[radiusStops.length - 1].radius;
    } else {
      for (let i = 0; i < radiusStops.length - 1; i++) {
        const current = radiusStops[i];
        const next = radiusStops[i + 1];

        if (count >= current.count && count <= next.count) {
          const ratio = (count - current.count) / (next.count - current.count);
          radius = current.radius + ratio * (next.radius - current.radius);
          break;
        }
      }
    }

    let shouldShow = false;
    if (zoom <= 1.5) {
      shouldShow = radius > 95;
    } else if (zoom > 1.5 && zoom <= 2.0) {
      shouldShow = radius > 80;
    } else if (zoom > 2.0 && zoom <= 2.5) {
      shouldShow = radius > 65;
    } else {
      shouldShow = true;
    }

    countryTextRef.current.style.visibility = shouldShow ? 'visible' : 'hidden';
  }, [zoom, count]);

  return null;
};
