import type { RoomView } from './giftTypes';

export const GIFT_API = import.meta.env.VITE_GIFT_API_URL ?? 'http://localhost:8000';

async function call<T>(path: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(`${GIFT_API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { detail?: string };
    throw new Error(err.detail ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const createRoom = (name: string, pin: string, email?: string) =>
  call<{ room_id: string; role: 'A' }>('/api/rooms', 'POST', { name, pin, email });

export const joinRoom = (roomId: string, name: string, pin: string, email?: string) =>
  call<{ role: 'B'; already_joined?: boolean }>(`/api/rooms/${roomId}/join`, 'POST', { name, pin, email });

export const getView = (roomId: string, pin: string) =>
  call<RoomView>(`/api/rooms/${roomId}/view`, 'POST', { pin });

export const addItem = (
  roomId: string,
  pin: string,
  item: { name: string; link?: string; price?: string; notes?: string },
) => call<{ id: string }>(`/api/rooms/${roomId}/items`, 'POST', { pin, ...item });

export const removeItem = (roomId: string, itemId: string, pin: string) =>
  call<{ ok: boolean }>(`/api/rooms/${roomId}/items/${itemId}`, 'DELETE', { pin });

export const generateDecoys = (roomId: string, pin: string, anthropic_key?: string) =>
  call<{ count: number }>(`/api/rooms/${roomId}/generate-decoys`, 'POST', { pin, anthropic_key });

export const pickItem = (roomId: string, pin: string, item_id: string) =>
  call<{ ok: boolean }>(`/api/rooms/${roomId}/pick`, 'POST', { pin, item_id });
