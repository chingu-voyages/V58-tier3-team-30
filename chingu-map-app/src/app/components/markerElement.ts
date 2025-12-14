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

const colorStops = [
  { count: 1, color: '#b64fff' },
  { count: 5, color: '#b64fff' },
  { count: 20, color: '#b64fff' },
  { count: 50, color: '#40b8f5' },
  { count: 100, color: '#40b8f5' },
  { count: 150, color: '#40b8f5' },
  { count: 300, color: '#0fe18b' },
  { count: 600, color: '#0fe18b' },
  { count: 2000, color: '#0fe18b' },
];

function interpolate(count: number): number {
  if (count <= radiusStops[0].count) {
    return radiusStops[0].radius;
  }

  if (count >= radiusStops[radiusStops.length - 1].count) {
    return radiusStops[radiusStops.length - 1].radius;
  }

  for (let i = 0; i < radiusStops.length - 1; i++) {
    const current = radiusStops[i];
    const next = radiusStops[i + 1];

    if (count >= current.count && count <= next.count) {
      const ratio = (count - current.count) / (next.count - current.count);
      return current.radius + ratio * (next.radius - current.radius);
    }
  }

  return radiusStops[0].radius;
}

function getColor(count: number): string {
  for (let i = colorStops.length - 1; i >= 0; i--) {
    if (count >= colorStops[i].count) {
      return colorStops[i].color;
    }
  }

  return colorStops[0].color;
}

export function createMarkerElement(country: string, count: number) {
  const el = document.createElement('div');
  const countCircle = document.createElement('div');
  const countText = document.createElement('p');
  const countryText = document.createElement('p');

  countryText.setAttribute('data-country-text', 'true');

  const radius = interpolate(count);
  const size = radius * 2;
  const backgroundColor = getColor(count);

  countCircle.style.width = `${size}px`;
  countCircle.style.height = `${size}px`;
  countCircle.style.padding = '8px';

  countCircle.style.backgroundColor = backgroundColor;

  let zIndex = 1;
  if (radius >= 130) zIndex = 10;
  else if (radius >= 110) zIndex = 9;
  else if (radius >= 95) zIndex = 8;
  else if (radius >= 80) zIndex = 7;
  else if (radius >= 65) zIndex = 6;
  else if (radius >= 50) zIndex = 5;
  else if (radius >= 35) zIndex = 4;
  else if (radius >= 25) zIndex = 3;
  else if (radius >= 15) zIndex = 2;

  el.style.zIndex = String(zIndex);

  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';

  countCircle.style.display = 'flex';
  countCircle.style.flexDirection = 'column';
  countCircle.style.alignItems = 'center';
  countCircle.style.justifyContent = 'center';
  countCircle.style.borderRadius = '50%';
  countCircle.style.color = '#000';
  countCircle.style.fontSize = '12px';
  countCircle.style.fontWeight = 'bold';
  countCircle.style.textAlign = 'center';
  countCircle.style.overflow = 'hidden';

  let textScale;
  if (radius < 50) {
    textScale = (radius * 0.7) / 50;
  } else {
    textScale = Math.max(0.8, Math.min(2.0, size / 100));
  }

  const countFontSize = Math.max(12, Math.min(24, 16 * textScale));
  countText.style.fontSize = `${countFontSize}px`;
  countText.style.lineHeight = '1.2';
  countText.style.margin = '0';
  countText.textContent = String(count);

  const countryFontSize = Math.max(12, Math.min(14, 9 * textScale));
  countryText.style.fontSize = `${countryFontSize}px`;
  countryText.style.fontWeight = '400';
  countryText.style.lineHeight = '1.2';
  countryText.style.margin = '0';
  countryText.style.color = '#fff';
  countryText.style.wordBreak = 'break-word';
  countryText.style.hyphens = 'auto';
  countryText.style.whiteSpace = 'normal';
  countryText.style.maxWidth = '100%';
  countryText.textContent = country;

  countCircle.appendChild(countText);
  el.appendChild(countCircle);
  el.appendChild(countryText);

  return el;
}
