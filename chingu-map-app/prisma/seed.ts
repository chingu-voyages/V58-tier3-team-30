import fs from 'fs';
import prisma from '../src/db';

const displayNamesCache = new Map<string, Intl.DisplayNames>();

export function getCountryName(code?: string, locale = 'en'): string {
  if (!code) return 'Unknown';
  const normalized = code.toUpperCase();
  let dn = displayNamesCache.get(locale);
  if (!dn) {
    dn = new Intl.DisplayNames([locale], { type: 'region' });
    displayNamesCache.set(locale, dn);
  }
  return dn.of(normalized) ?? normalized;
}

export type RawChinguEntry = {
  Timestamp: string;
  Gender: string;
  'Country Code': string;
  Timezone: string;
  Goal: string;
  'Goal-Other': string | number;
  Source: string;
  'Source-Other': string | number;
  'Country name (from Country)': string;
  'Solo Project Tier': string;
  'Role Type': string;
  'Voyage Role': string;
  'Voyage (from Voyage Signups)': string;
  'Voyage Tier': string;
};

async function main() {
  const raw = fs.readFileSync(__dirname + '/data.json', 'utf8');
  const data = JSON.parse(raw);

  const chunkSize = 500;

  for (let i = 0; i < data.chingus.length; i += chunkSize) {
    const chunk = data.chingus.slice(i, i + chunkSize);

    const payload = chunk.map((entry: RawChinguEntry) => {
      return {
        timestamp:
          entry.Timestamp === null
            ? null
            : entry.Timestamp === ''
              ? null
              : new Date(entry.Timestamp.replace(/\s+/g, ' ').trim()),
        gender: entry.Gender || null,
        countryCode:
          entry['Country Code'] === 'Philippines (PH)'
            ? 'PH'
            : entry['Country Code'] || null,
        timezone: entry.Timezone || null,
        goal: entry.Goal || null,
        goalOther:
          entry['Goal-Other'] == null ? null : String(entry['Goal-Other']),
        source: entry.Source || null,
        sourceOther:
          entry['Source-Other'] == null ? null : String(entry['Source-Other']),
        countryName: getCountryName(entry['Country Code']) || null,
        soloProjectTier: entry['Solo Project Tier'] || null,
        roleType: entry['Role Type'] || null,
        voyageRole: entry['Voyage Role'] || null,
        voyageSignup: entry['Voyage (from Voyage Signups)'] || null,
        voyageTier: entry['Voyage Tier'] || null,
      };
    });

    console.log(`Inserting rows ${i} to ${i + payload.length}`);
    try {
      await prisma.chingu.createMany({ data: payload });
    } catch (e) {
      console.error('Batch failed, drilling down...', e);
      for (const row of payload) {
        try {
          await prisma.chingu.create({ data: row });
        } catch (err) {
          console.error('Failed row:', row, err);
          break;
        }
      }
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
