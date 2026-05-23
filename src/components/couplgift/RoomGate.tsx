import { useState } from 'react';
import { LogIn, Plus } from 'lucide-react';
import { createRoom, getView, joinRoom } from '../../utils/giftApi';

interface Props {
  prefilledRoomId?: string;
  onAuth: (roomId: string, pin: string) => void;
}

type Screen = 'landing' | 'creating' | 'entering' | 'joining';

export default function RoomGate({ prefilledRoomId, onAuth }: Props) {
  const [screen, setScreen] = useState<Screen>(prefilledRoomId ? 'joining' : 'landing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [roomId, setRoomId] = useState(prefilledRoomId ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate() {
    setError('');
    if (!name.trim()) { setError('Enter your name'); return; }
    if (pin.length < 4) { setError('PIN must be at least 4 characters'); return; }
    setLoading(true);
    try {
      const { room_id } = await createRoom(name.trim(), pin, email.trim() || undefined);
      onAuth(room_id, pin);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create room');
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin() {
    setError('');
    if (!roomId.trim()) { setError('Enter a room ID or use the partner link'); return; }
    if (!name.trim()) { setError('Enter your name'); return; }
    if (pin.length < 4) { setError('PIN must be at least 4 characters'); return; }
    setLoading(true);
    try {
      await joinRoom(roomId.trim(), name.trim(), pin, email.trim() || undefined);
      onAuth(roomId.trim(), pin);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not join room');
    } finally {
      setLoading(false);
    }
  }

  async function handleEnter() {
    setError('');
    if (!roomId.trim()) { setError('Enter your room ID'); return; }
    if (pin.length < 4) { setError('Enter your PIN'); return; }
    setLoading(true);
    try {
      await getView(roomId.trim(), pin);
      onAuth(roomId.trim(), pin);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not access room');
    } finally {
      setLoading(false);
    }
  }

  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎁</div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-3 tracking-tight">
            Couple Gift Exchange
          </h1>
          <p className="text-zinc-500 max-w-sm mx-auto">
            Fill your wishlist. Generate AI decoys. Your partner guesses what's real — and picks what to buy.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={() => setScreen('creating')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 active:scale-95 transition-all shadow-lg shadow-violet-200"
          >
            <Plus size={16} />
            Create a room
          </button>
          <button
            onClick={() => setScreen('entering')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-700 font-semibold text-sm hover:border-violet-300 hover:text-violet-700 transition-all"
          >
            <LogIn size={16} />
            Enter a room
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'creating') {
    return (
      <FormShell
        title="Create your room"
        subtitle="You'll get a link to share with your partner."
        onBack={() => setScreen('landing')}
        onSubmit={handleCreate}
        submitLabel="Create room →"
        loading={loading}
        error={error}
      >
        <Field label="Your name" value={name} onChange={setName} placeholder="e.g. Alex" />
        <Field label="Your PIN (4+ chars)" value={pin} onChange={setPin} placeholder="Only you will know this" type="password" />
        <Field label="Your email (optional)" value={email} onChange={setEmail} placeholder="Get notified when partner picks" type="email" />
        <p className="text-xs text-zinc-400">Email used only to notify you when your partner acts — no spam.</p>
      </FormShell>
    );
  }

  if (screen === 'joining') {
    return (
      <FormShell
        title="Join the gift room"
        subtitle="Your partner sent you this link. Set your name and pick a PIN."
        onBack={undefined}
        onSubmit={handleJoin}
        submitLabel="Join room →"
        loading={loading}
        error={error}
      >
        <Field label="Your name" value={name} onChange={setName} placeholder="e.g. Jamie" />
        <Field label="Choose a PIN (4+ chars)" value={pin} onChange={setPin} placeholder="Pick something only you'll remember" type="password" />
        <Field label="Your email (optional)" value={email} onChange={setEmail} placeholder="Get notified when partner picks" type="email" />
        <p className="text-xs text-zinc-400">
          Already joined?{' '}
          <button onClick={() => setScreen('entering')} className="text-violet-600 underline">
            Enter with your PIN instead
          </button>
        </p>
      </FormShell>
    );
  }

  return (
    <FormShell
      title="Enter your room"
      subtitle="Use your room ID and PIN to get back in."
      onBack={() => setScreen('landing')}
      onSubmit={handleEnter}
      submitLabel="Enter →"
      loading={loading}
      error={error}
    >
      <Field label="Room ID" value={roomId} onChange={setRoomId} placeholder="Paste the room ID" />
      <Field label="Your PIN" value={pin} onChange={setPin} placeholder="The PIN you set" type="password" />
      <p className="text-xs text-zinc-400">
        Don't have a room?{' '}
        <button onClick={() => setScreen('creating')} className="text-violet-600 underline">Create one</button>
        {' · '}
        <button onClick={() => setScreen('joining')} className="text-violet-600 underline">Join via link</button>
      </p>
    </FormShell>
  );
}

function FormShell({
  title, subtitle, onBack, onSubmit, submitLabel, loading, error, children,
}: {
  title: string; subtitle: string; onBack?: () => void; onSubmit: () => void;
  submitLabel: string; loading: boolean; error: string; children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {onBack && (
          <button onClick={onBack} className="text-sm text-zinc-400 hover:text-zinc-700 mb-6 flex items-center gap-1">
            ← Back
          </button>
        )}
        <div className="mb-8">
          <div className="text-3xl mb-3">🎁</div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-1">{title}</h2>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
        <div className="space-y-4">
          {children}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</div>
          )}
          <button
            onClick={onSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-100"
          >
            {loading ? 'Please wait…' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-600 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
      />
    </div>
  );
}
