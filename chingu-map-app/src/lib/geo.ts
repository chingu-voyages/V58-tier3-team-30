import countries from 'world-countries';

interface CountryCoords {
  lat: number;
  lng: number;
}

interface Country {
  name: {
    common: string;
  };
  latlng?: [number, number];
}

interface CountryData {
  name: {
    common: string;
  };
  latlng?: [number, number];
  area: number;
  cca2: string;
  cca3: string;
}

export function getCountryData(countryName: string | null): CountryData | null {
  const country = countries.find(
    (c: Country) => c.name?.common?.toUpperCase() === countryName?.toUpperCase()
  );

  if (!country) {
    return null;
  }

  return country;
}

export function getCountryCoords(
  countryName: string | null
): CountryCoords | null {
  const country = countries.find(
    (c: Country) => c.name?.common?.toUpperCase() === countryName?.toUpperCase()
  );

  if (!country || !country.latlng) {
    return null;
  }

  const [lat, lng] = country.latlng;

  return { lat, lng };
}
