export interface WishlistItem {
  id: string;
  room_id: string;
  role: 'A' | 'B';
  name: string;
  link?: string | null;
  price?: string | null;
  notes?: string | null;
  is_ai_decoy: number;
  added_at: string;
}

export interface PickedItem {
  item_id: string;
  name: string;
  price?: string | null;
  notes?: string | null;
  link?: string | null;
  is_ai_decoy?: number;
  by_role: 'A' | 'B';
  picked_at: string;
}

export interface RoomView {
  role: 'A' | 'B';
  my_name: string;
  partner_name: string | null;
  partner_joined: boolean;
  has_api_key: boolean;
  partner_has_items: boolean;
  pool_ready: boolean;
  partner_pool_ready: boolean;
  my_items: WishlistItem[];
  my_decoys: WishlistItem[];
  partner_pool: WishlistItem[];
  my_picks: PickedItem[];
  my_pool_picks: PickedItem[];
}
