import { Product } from './product';

export interface Order {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  order_items?: Product[];
  removed?: boolean;
}
