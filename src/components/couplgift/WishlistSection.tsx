import { useState } from 'react';
import { ExternalLink, KeyRound, Loader2, Plus, RefreshCw, Trash2 } from 'lucide-react';
import type { WishlistItem } from '../../utils/giftTypes';
import { addItem, generateDecoys, removeItem } from '../../utils/giftApi';

interface Props {
  roomId: string;
  pin: string;
  items: WishlistItem[];
  decoys: WishlistItem[];
  partnerJoined: boolean;
  hasApiKey: boolean;
  onRefresh: () => void;
}

export default function WishlistSection({ roomId, pin, items, decoys, partnerJoined, hasApiKey, onRefresh }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gift-anthropic-key') ?? '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');

  function saveKey(k: string) {
    setApiKey(k);
    localStorage.setItem('gift-anthropic-key', k);
  }

  async function handleAdd() {
    if (!name.trim()) { setFormError('Item name is required'); return; }
    setFormError('');
    setAdding(true);
    try {
      await addItem(roomId, pin, {
        name: name.trim(),
        link: link.trim() || undefined,
        price: price.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      setName(''); setLink(''); setPrice(''); setNotes('');
      setShowForm(false);
      onRefresh();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Could not add item');
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: string) {
    setRemovingId(id);
    try {
      await removeItem(roomId, id, pin);
      onRefresh();
    } catch { /* ignore */ }
    finally { setRemovingId(null); }
  }

  async function handleGenerateDecoys() {
    if (!hasApiKey && !apiKey.trim()) { setShowKeyInput(true); return; }
    setGenerateError('');
    setGenerating(true);
    try {
      await generateDecoys(roomId, pin, apiKey.trim() || undefined);
      onRefresh();
    } catch (e) {
      setGenerateError(e instanceof Error ? e.message : 'Could not generate decoys');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* My real wishlist */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-zinc-900">My Wishlist</h2>
            <p className="text-xs text-zinc-400">Private — only you can see these</p>
          </div>
          <button
            onClick={() => { setShowForm((v) => !v); setFormError(''); }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 font-semibold hover:bg-violet-200 transition-colors"
          >
            <Plus size={12} /> Add item
          </button>
        </div>

        {showForm && (
          <div className="mb-5 bg-white border border-violet-100 rounded-2xl p-4 space-y-3">
            <FormField label="Gift name *" value={name} onChange={setName} placeholder="e.g. Silk pillowcase" />
            <FormField label="Link (optional)" value={link} onChange={setLink} placeholder="https://..." />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Price (optional)" value={price} onChange={setPrice} placeholder="e.g. 45" />
              <FormField label="Notes (optional)" value={notes} onChange={setNotes} placeholder="Size M, ivory" />
            </div>
            {formError && <p className="text-xs text-red-500">{formError}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={adding}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors disabled:opacity-40"
              >
                {adding ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                Add
              </button>
              <button
                onClick={() => { setShowForm(false); setFormError(''); }}
                className="px-4 py-2 rounded-xl text-xs text-zinc-500 hover:text-zinc-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-8 text-zinc-300">
            <p className="text-sm">Add items you'd actually love to receive</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <ItemRow key={item.id} item={item} onRemove={() => handleRemove(item.id)} removing={removingId === item.id} />
            ))}
          </ul>
        )}
      </div>

      {/* Generate decoys */}
      <div className="bg-violet-50 rounded-2xl border border-violet-100 p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
              🎭 Generate decoys for your partner
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              AI mimics your style and adds fake items — your partner can't tell what's real
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {!hasApiKey && (
              <button
                onClick={() => setShowKeyInput((v) => !v)}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors ${
                  apiKey ? 'text-zinc-400 border-zinc-200' : 'text-violet-600 border-violet-300 bg-white'
                }`}
              >
                <KeyRound size={10} />
                {apiKey ? 'Key set' : 'Add key'}
              </button>
            )}
            {hasApiKey && (
              <span className="flex items-center gap-1 text-xs text-emerald-600">
                <KeyRound size={10} /> Key shared
              </span>
            )}
            <button
              onClick={handleGenerateDecoys}
              disabled={generating || items.length === 0}
              title={items.length === 0 ? 'Add wishlist items first' : undefined}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {generating ? <Loader2 size={11} className="animate-spin" /> : decoys.length > 0 ? <RefreshCw size={11} /> : '✨'}
              {generating ? 'Generating…' : decoys.length > 0 ? 'Regenerate' : 'Generate'}
            </button>
          </div>
        </div>

        {showKeyInput && (
          <div className="flex gap-2 mt-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => saveKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
            />
            <button onClick={() => setShowKeyInput(false)} className="px-3 py-2 text-xs rounded-xl bg-violet-100 text-violet-700 font-semibold">Done</button>
          </div>
        )}

        {generateError && <p className="text-xs text-red-500 mt-2">{generateError}</p>}

        {decoys.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-zinc-500 mb-2">
              Your pool ({items.length} real + {decoys.length} decoys) — this is what {partnerJoined ? 'your partner sees' : 'your partner will see'}:
            </p>
            <ul className="space-y-1.5">
              {decoys.map((d) => (
                <li key={d.id} className="flex items-center gap-2 text-xs text-zinc-500 bg-white rounded-lg px-3 py-2 border border-dashed border-violet-200">
                  <span className="text-violet-300">🤖</span>
                  <span>{d.name}</span>
                  {d.price && <span className="text-zinc-300">${d.price}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemRow({ item, onRemove, removing }: { item: WishlistItem; onRemove: () => void; removing: boolean }) {
  return (
    <li className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-zinc-100 group">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
        <div className="flex items-center gap-3 mt-0.5">
          {item.price && <span className="text-xs text-zinc-400">${item.price}</span>}
          {item.notes && <span className="text-xs text-zinc-400 truncate">{item.notes}</span>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-violet-500 transition-colors">
            <ExternalLink size={13} />
          </a>
        )}
        <button
          onClick={onRemove}
          disabled={removing}
          className="text-zinc-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-40"
        >
          {removing ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
        </button>
      </div>
    </li>
  );
}

function FormField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-500 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 text-sm placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
      />
    </div>
  );
}
