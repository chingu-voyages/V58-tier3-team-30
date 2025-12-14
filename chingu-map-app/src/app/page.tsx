import { Filter } from './components/Filter';
import { SearchBar } from './components/SearchBar';
import { ViewToggle } from './components/ViewToggle';
import { Map } from './components/Map';
import { CountryList } from './components/CountryList';
import { CountryOverview } from './components/CountryOverview';
import { Hero } from './components/Hero';
import { About } from './components/About';

export default function Home() {
  return (
    <div className="flex-1">
      <div className="absolute top-0 left-0 right-0 h-screen overflow-y-auto z-10 pointer-events-none flex justify-center">
        <div className="w-full max-w-4xl px-4 pt-40 pb-40">
          <Hero />
          <About />
        </div>
      </div>
      <div className="bg-black w-full flex md:justify-center">
        <div className="flex w-full md:w-auto gap-2 items-center p-1">
          <Filter />
          <SearchBar />
        </div>
      </div>
      <ViewToggle />
      <Map />
      <CountryList />
      <CountryOverview />
    </div>
  );
}
