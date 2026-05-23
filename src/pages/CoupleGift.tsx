import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, Copy, Loader2, RefreshCw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import type { RoomView } from '../utils/giftTypes';
import { getView } from '../utils/giftApi';
import RoomGate from '../components/couplgift/RoomGate';
import WishlistSection from '../components/couplgift/WishlistSection';
import PartnerPool from '../components/couplgift/PartnerPool';

interface AuthState {
  roomId: string;
  pin: string;
}

export default function CoupleGift() {
  const [searchParams] = useSearchParams();
  const prefilledRoomId = searchParams.get('room') ?? undefined;

  const [auth, setAuth] = useState<AuthState | null>(null);
  const [roomData, setRoomData] = useState<RoomView | null>(null);
  const [loadError, setLoadError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadView = useCallback(async (silent = false) => {
    if (!auth) return;
    if (!silent) setRefreshing(true);
    setLoadError('');
    try {
      const data = await getView(auth.roomId, auth.pin);
      setRoomData(data);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Could not load room');
    } finally {
      setRefreshing(false);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth) return;
    loadView();
    pollRef.current = setInterval(() => loadView(true), 30_000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [auth, loadView]);

  function handleAuth(roomId: string, pin: string) {
    setAuth({ roomId, pin });
  }

  function copyShareLink() {
    if (!auth) return;
    const url = `${window.location.origin}${window.location.pathname}?room=${auth.roomId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!auth) {
    return <RoomGate prefilledRoomId={prefilledRoomId} onAuth={handleAuth} />;
  }

  if (!roomData && !loadError) {
    return (
      <div className="min-h-screen bg-[#f8f5ff] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-violet-400" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#f8f5ff] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-red-500 text-sm">{loadError}</p>
        <button onClick={() => loadView()} className="text-sm text-violet-600 underline">Try again</button>
        <button
          onClick={() => { setAuth(null); setRoomData(null); setLoadError(''); }}
          className="text-sm text-zinc-400 underline"
        >
          Back to start
        </button>
      </div>
    );
  }

  const data = roomData!;

  return (
    <div className="min-h-screen bg-[#f8f5ff]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-violet-100/80">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-zinc-400 hover:text-zinc-700 transition-colors flex items-center gap-1 text-sm">
              <ArrowLeft size={14} /> Lab
            </Link>
            <span className="text-zinc-200">/</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🎁</span>
              <span className="font-bold text-zinc-900 tracking-tight">Gift Exchange</span>
            </div>
          </div>
          <button
            onClick={() => loadView()}
            disabled={refreshing}
            className="text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Status banner */}
        <div className="bg-white rounded-2xl border border-violet-100 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-zinc-900 mb-1">
                Hey {data.my_name} 👋
              </p>
              {data.partner_joined ? (
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <Check size={11} />
                  {data.partner_name} has joined
                  {data.partner_has_items ? ' · has added items' : ' · hasn\'t added items yet'}
                  {data.partner_pool_ready ? ' · pool ready 🎭' : ''}
                </p>
              ) : (
                <p className="text-xs text-amber-600">Waiting for your partner to join</p>
              )}
            </div>
            {!data.partner_joined && (
              <button
                onClick={copyShareLink}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-violet-100 text-violet-700 font-semibold hover:bg-violet-200 transition-colors"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied!' : 'Copy invite link'}
              </button>
            )}
          </div>

          {!data.partner_joined && (
            <div className="mt-3">
              <p className="text-xs text-zinc-400 font-mono bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 truncate">
                {window.location.origin}{window.location.pathname}?room={auth.roomId}
              </p>
            </div>
          )}
        </div>

        {/* My wishlist + decoy generation */}
        <section>
          <WishlistSection
            roomId={auth.roomId}
            pin={auth.pin}
            items={data.my_items}
            decoys={data.my_decoys}
            partnerJoined={data.partner_joined}
            hasApiKey={data.has_api_key}
            onRefresh={() => loadView(true)}
          />
        </section>

        <div className="border-t border-zinc-100" />

        {/* Partner's pool — where I pick from */}
        <section>
          <PartnerPool
            roomId={auth.roomId}
            pin={auth.pin}
            partnerName={data.partner_name ?? 'Partner'}
            partnerJoined={data.partner_joined}
            partnerHasItems={data.partner_has_items}
            partnerPoolReady={data.partner_pool_ready}
            pool={data.partner_pool}
            myPicks={data.my_picks}
            myPoolPicks={data.my_pool_picks}
            onRefresh={() => loadView(true)}
          />
        </section>
      </main>
    </div>
  );
}
