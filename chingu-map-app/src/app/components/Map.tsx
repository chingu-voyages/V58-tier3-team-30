'use client';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { StyleSpecification } from 'mapbox-gl';
import { Marker } from './Marker';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import { getCountryData } from '@/lib/geo';
import { useChinguStats } from '@/hooks/useChinguStats';
import { useUIView } from '@/stores/useUIViewStore';

const calculateZoom = (area: number): number => {
  if (area > 5000000) return 2.5;
  if (area > 1000000) return 3.5;
  if (area > 500000) return 4;
  if (area > 100000) return 5;
  if (area > 50000) return 6;
  return 7;
};

export const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1.5);
  const { selectedCountry } = useSelectedCountry();
  const { currentView } = useUIView();

  const spinningRef = useRef(true);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  // const [zoomThreshold, setZoomThreshold] = useState(0);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapStyle: StyleSpecification = {
      version: 8,
      name: 'My Custom Style',
      glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      sprite: 'mapbox://sprites/mapbox/streets-v12',
      fog: {
        color: '#2e74a3',
        'high-color': '#b64fff',
        'space-color': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          '#010b19',
          4,
          '#010b19',
          7,
          '#367ab9',
        ],
        'horizon-blend': 0.1,
        'star-intensity': 0.6,
        range: [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          ['literal', [0.2, 1]],
          22,
          ['literal', [0.2, 1]],
        ],
      },
      sources: {
        'mapbox-streets': {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
        'mapbox-countries': {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        },
        'country-labels-source': {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': '#171e3d',
            'background-pattern': 'dots-large',
          },
        },
        {
          id: 'water',
          type: 'fill',
          source: 'mapbox-streets',
          'source-layer': 'water',
          paint: {
            'fill-color': '#1b2f52',
          },
        },
        {
          id: 'country-boundaries',
          type: 'fill',
          source: 'mapbox-countries',
          'source-layer': 'country_boundaries',
          paint: {
            'fill-color': '#171e3d',
            'fill-outline-color': '#40b8f5',
          },
        },
      ],
    };

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
    const m = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [0, 90],
      pitch: 70,
      bearing: 0,
      zoom: 1.5,
      style: mapStyle,
      projection: 'globe',
    });

    m.on('load', () => {
      m.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
        promoteId: 'mapbox_id',
      });
    });

    setMap(m);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      m.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const handleZoomChange = () => {
      const zoom = map.getZoom();
      setCurrentZoom(zoom);
    };

    map.on('zoomend', handleZoomChange);

    return () => {
      map.off('zoomend', handleZoomChange);
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const rotationSpeed = 0.05;

    const rotateGlobe = (timestamp: number) => {
      if (!spinningRef.current) {
        animationFrameIdRef.current = null;
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed > 16) {
        const c = map.getCenter();
        map.setCenter([c.lng + rotationSpeed, c.lat]);
        lastTimeRef.current = timestamp;
      }

      animationFrameIdRef.current = requestAnimationFrame(rotateGlobe);
    };

    if (currentView === 'home') {
      spinningRef.current = true;
      lastTimeRef.current = 0;

      map.flyTo({
        center: [0, 90],
        pitch: 70,
        bearing: 0,
        zoom: 1.5,
        duration: 2000,
      });

      setTimeout(() => {
        if (spinningRef.current) {
          rotateGlobe(0);
        }
      }, 2100);
    } else {
      spinningRef.current = false;
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      setTimeout(() => {
        map.flyTo({
          center: [0, 0],
          pitch: 0,
          bearing: 0,
          zoom: 1.5,
          duration: 2000,
        });
      }, 100);
    }
  }, [map, currentView]);

  useEffect(() => {
    if (!map || !selectedCountry) return;

    const countryData = getCountryData(selectedCountry);

    if (!countryData) return;

    const { area, latlng } = countryData;

    if (!latlng) return;

    const [lat, lng] = latlng;

    const zoom = countryData ? calculateZoom(area) : 3;

    map.flyTo({
      center: [lng, lat],
      essential: true,
      zoom,
    });
  }, [map, selectedCountry]);

  const { countries } = useChinguStats();
  const showMarkers = currentView !== 'home';

  return (
    <div className="relative h-full w-full">
      <div id="map-container" className="h-full w-full" ref={mapContainerRef} />
      {showMarkers &&
        Object.entries(countries).map(([country, count]) => (
          <Marker
            key={country}
            map={map}
            country={country}
            count={count}
            zoom={currentZoom}
          />
        ))}
    </div>
  );
};
