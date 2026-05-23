import { useState } from 'react';
import { KeyRound, X } from 'lucide-react';
import type { ApiKeys } from '../../utils/types';

interface Props {
  keys: ApiKeys;
  onSave: (keys: ApiKeys) => void;
  onClose: () => void;
}

export default function ApiKeySetup({ keys, onSave, onClose }: Props) {
  const [anthropic, setAnthropic] = useState(keys.anthropic);
  const [openweather, setOpenweather] = useState(keys.openweather);

  function handleSave() {
    if (!anthropic.trim() || !openweather.trim()) return;
    onSave({ anthropic: anthropic.trim(), openweather: openweather.trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <KeyRound size={18} className="text-rose-500" />
            <h2 className="font-bold text-zinc-900">Set up API keys</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-zinc-500 mb-5 leading-relaxed">
          Keys are stored in your browser only — never sent anywhere except the respective APIs.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Anthropic API key
            </label>
            <input
              type="password"
              value={anthropic}
              onChange={(e) => setAnthropic(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <p className="text-xs text-zinc-400 mt-1">
              Get one at{' '}
              <span className="font-medium text-zinc-500">console.anthropic.com</span>
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              OpenWeatherMap API key
            </label>
            <input
              type="password"
              value={openweather}
              onChange={(e) => setOpenweather(e.target.value)}
              placeholder="Your OWM key..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <p className="text-xs text-zinc-400 mt-1">
              Free tier at{' '}
              <span className="font-medium text-zinc-500">openweathermap.org/api</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!anthropic.trim() || !openweather.trim()}
          className="mt-6 w-full py-2.5 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save keys & start planning
        </button>
      </div>
    </div>
  );
}
