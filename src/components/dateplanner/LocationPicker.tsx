import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import type { GeoLocation } from '../../utils/types';
import { reverseGeocode, searchCities } from '../../utils/weatherApi';

interface Props {
  location: GeoLocation | null;
  onSelect: (loc: GeoLocation) => void;
  owmKey: string;
}

export default function LocationPicker({ location, onSelect, owmKey }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await searchCities(query, owmKey);
        setResults(r);
        if (r.length === 0) setError('No cities found. Check your OpenWeatherMap key is correct and activated (new keys take up to 10 min).');
        else setError('');
      } catch {
        setError('City search failed. If you just created your OpenWeatherMap key, wait up to 10 minutes for it to activate.');
        setResults([]);
      }
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, owmKey]);

  async function detectLocation() {
    setDetecting(true);
    setError('');
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
      );
      const loc = await reverseGeocode(pos.coords.latitude, pos.coords.longitude, owmKey);
      if (loc) {
        onSelect(loc);
        setOpen(false);
      } else {
        setError('Could not identify your location. Try searching instead.');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      if (msg.includes('denied') || msg.includes('PERMISSION')) {
        setError('Location access denied. Please search for your city instead.');
      } else {
        setError('Could not identify your location — your OpenWeatherMap key may not be activated yet (new keys take up to 10 min). Try searching for your city instead.');
      }
    } finally {
      setDetecting(false);
    }
  }

  function select(loc: GeoLocation) {
    onSelect(loc);
    setOpen(false);
    setQuery('');
    setResults([]);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-400 transition-all text-sm font-medium"
      >
        <MapPin size={15} />
        {location ? location.displayName : 'Set your location'}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-rose-500" />
                <h2 className="font-bold text-zinc-900">Where are you?</h2>
              </div>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-700">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
              Your location helps us check the weather and factor in distance when suggesting what to do and when.
            </p>

            {/* Detect button */}
            <button
              onClick={detectLocation}
              disabled={detecting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors disabled:opacity-60"
            >
              <Navigation size={15} />
              {detecting ? 'Detecting...' : 'Detect my location'}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-xs text-zinc-400 font-medium">or search</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a city..."
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>

            {results.length > 0 && (
              <ul className="mt-2 rounded-xl border border-zinc-100 overflow-hidden shadow-sm">
                {results.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => select(r)}
                      className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-rose-50 hover:text-rose-700 transition-colors flex items-center gap-2"
                    >
                      <MapPin size={12} className="text-zinc-300 shrink-0" />
                      {r.displayName}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p className="mt-3 text-xs text-rose-500 bg-rose-50 rounded-lg px-3 py-2">{error}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
