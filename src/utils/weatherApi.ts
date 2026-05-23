import type { GeoLocation, WeatherDay } from './types';

const OWM = 'https://api.openweathermap.org';

function iconToEmoji(icon: string): string {
  const code = icon.slice(0, 2);
  const map: Record<string, string> = {
    '01': '☀️', '02': '🌤️', '03': '⛅',
    '04': '☁️', '09': '🌧️', '10': '🌦️',
    '11': '⛈️', '13': '❄️', '50': '🌫️',
  };
  return map[code] ?? '🌡️';
}

function goodForOutdoor(icon: string, maxTemp: number): boolean {
  const bad = ['09', '10', '11', '13'];
  return !bad.includes(icon.slice(0, 2)) && maxTemp >= 10;
}

export async function searchCities(query: string, apiKey: string): Promise<GeoLocation[]> {
  if (!query.trim()) return [];
  const res = await fetch(
    `${OWM}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
  );
  if (!res.ok) throw new Error('City search failed');
  const data = await res.json() as Array<{
    name: string; country: string; state?: string; lat: number; lon: number;
  }>;
  return data.map((d) => ({
    city: d.name,
    country: d.country,
    lat: d.lat,
    lon: d.lon,
    displayName: d.state ? `${d.name}, ${d.state}, ${d.country}` : `${d.name}, ${d.country}`,
  }));
}

export async function reverseGeocode(lat: number, lon: number, apiKey: string): Promise<GeoLocation | null> {
  const res = await fetch(
    `${OWM}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
  );
  if (!res.ok) return null;
  const data = await res.json() as Array<{
    name: string; country: string; state?: string; lat: number; lon: number;
  }>;
  if (!data.length) return null;
  const d = data[0];
  return {
    city: d.name,
    country: d.country,
    lat: d.lat,
    lon: d.lon,
    displayName: d.state ? `${d.name}, ${d.state}, ${d.country}` : `${d.name}, ${d.country}`,
  };
}

export async function fetchForecast(lat: number, lon: number, apiKey: string): Promise<WeatherDay[]> {
  const res = await fetch(
    `${OWM}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${apiKey}`
  );
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json() as {
    list: Array<{
      dt_txt: string;
      main: { temp_min: number; temp_max: number };
      weather: Array<{ icon: string; description: string }>;
    }>;
  };

  const byDay: Record<string, { temps: number[]; icons: string[]; desc: string[] }> = {};
  for (const item of data.list) {
    const date = item.dt_txt.split(' ')[0];
    if (!byDay[date]) byDay[date] = { temps: [], icons: [], desc: [] };
    byDay[date].temps.push(item.main.temp_min, item.main.temp_max);
    byDay[date].icons.push(item.weather[0].icon);
    byDay[date].desc.push(item.weather[0].description);
  }

  return Object.entries(byDay).map(([date, { temps, icons, desc }]) => {
    const tempMin = Math.round(Math.min(...temps));
    const tempMax = Math.round(Math.max(...temps));
    const dayIcon = icons.find((i) => i.endsWith('d')) ?? icons[0];
    return {
      date,
      tempMin,
      tempMax,
      emoji: iconToEmoji(dayIcon),
      description: desc[0],
      isGoodForOutdoor: goodForOutdoor(dayIcon, tempMax),
    };
  });
}
