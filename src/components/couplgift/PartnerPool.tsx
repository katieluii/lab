import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { PickedItem, WishlistItem } from '../../utils/giftTypes';
import { pickItem } from '../../utils/giftApi';

interface Props {
  roomId: string;
  pin: string;
  partnerName: string;
  partnerJoined: boolean;
  partnerHasItems: boolean;
  partnerPoolReady: boolean;
  pool: WishlistItem[];
  myPicks: PickedItem[];
  myPoolPicks: PickedItem[];
  onRefresh: () => void;
}

export default function PartnerPool({
  roomId, pin, partnerName, partnerJoined, partnerHasItems,
  partnerPoolReady, pool, myPicks, myPoolPicks, onRefresh,
}: Props) {
  const [pickingId, setPickingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const myPickedIds = new Set(myPicks.map((p) => p.item_id));

  async function handlePick(itemId: string) {
    setError('');
    setPickingId(itemId);
    try {
      await pickItem(roomId, pin, itemId);
      onRefresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not pick item');
    } finally {
      setPickingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold text-zinc-900">
          {partnerName ? `${partnerName}'s Pool` : "Partner's Pool"}
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Real wishes + AI decoys, all mixed — can you tell which is which?
        </p>
      </div>

      {!partnerJoined && (
        <div className="text-center py-10 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
          <div className="text-3xl mb-2">⏳</div>
          <p className="text-sm text-zinc-400">Waiting for your partner to join</p>
        </div>
      )}

      {partnerJoined && !partnerHasItems && (
        <div className="text-center py-10 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
          <div className="text-3xl mb-2">📝</div>
          <p className="text-sm text-zinc-400">{partnerName} hasn't added any items yet</p>
        </div>
      )}

      {partnerJoined && partnerHasItems && !partnerPoolReady && (
        <div className="text-center py-10 bg-amber-50 rounded-2xl border border-dashed border-amber-200">
          <div className="text-3xl mb-2">🎭</div>
          <p className="text-sm text-amber-600 font-medium">{partnerName} is still setting up their pool</p>
          <p className="text-xs text-amber-400 mt-1">They need to generate their decoys before you can see the mix</p>
        </div>
      )}

      {partnerPoolReady && (
        <>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</div>
          )}

          {pool.length === 0 ? (
            <p className="text-sm text-zinc-400 text-center py-6">All items have been picked!</p>
          ) : (
            <ul className="space-y-2">
              {pool.map((item) => {
                const picked = myPickedIds.has(item.id);
                return (
                  <li
                    key={item.id}
                    className={`flex items-start gap-3 rounded-xl px-4 py-3 border transition-all ${
                      picked
                        ? 'bg-zinc-50 border-zinc-100 opacity-60'
                        : 'bg-white border-zinc-100 hover:border-violet-200'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {item.price && <span className="text-xs text-zinc-400">${item.price}</span>}
                        {item.notes && <span className="text-xs text-zinc-400 truncate">{item.notes}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {picked ? (
                        <span className="text-xs text-violet-500 font-medium">✓ Getting this</span>
                      ) : (
                        <button
                          onClick={() => handlePick(item.id)}
                          disabled={pickingId === item.id}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 font-semibold hover:bg-violet-200 transition-colors disabled:opacity-40"
                        >
                          {pickingId === item.id ? <Loader2 size={10} className="animate-spin" /> : '🛒'}
                          I'm getting this
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {myPicks.length > 0 && (
            <div className="bg-violet-50 rounded-xl border border-violet-100 p-4">
              <p className="text-xs font-semibold text-violet-700 mb-2">
                What you're getting ({myPicks.length} item{myPicks.length !== 1 ? 's' : ''}):
              </p>
              <ul className="space-y-1">
                {myPicks.map((p) => (
                  <li key={p.item_id} className="text-xs text-zinc-600 flex items-center gap-1.5">
                    <span className="text-violet-400">✓</span> {p.name}
                    {p.price && <span className="text-zinc-400">${p.price}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* What partner has picked from my pool */}
      {myPoolPicks.length > 0 && (
        <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
          <p className="text-xs font-semibold text-amber-700 mb-2">
            {partnerName} is getting from your pool:
          </p>
          <ul className="space-y-1">
            {myPoolPicks.map((p) => (
              <li key={p.item_id} className="text-xs text-zinc-600 flex items-center gap-2">
                <span className="text-amber-400">🛒</span>
                <span>{p.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  p.is_ai_decoy ? 'bg-violet-100 text-violet-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {p.is_ai_decoy ? 'AI decoy 😏' : 'Real item ✓'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
