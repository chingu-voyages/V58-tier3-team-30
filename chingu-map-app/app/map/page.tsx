import { chinguService } from '../../features/chingu/chingu.service';
import { ChinguCountryStats } from '../../features/chingu/chingu.type';

export default async function MapPage() {
  const countries = await chinguService.getCountsByCountry();

  return (
    <div>
      <h1>Map Page</h1>
      {countries.map((country: ChinguCountryStats) => (
        <div key={country.countryCode} className='flex gap-3'>
          <p>{country.countryName} ({country.countryCode})</p>
          <p>{country.count}</p>
        </div>
      ))}
    </div>
  );
}
