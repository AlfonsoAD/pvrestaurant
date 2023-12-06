export interface Order {
  id: number;
  date: string;
  process_status: string[];
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user: number;
  table: number;
}

export interface DetailOrder {
  id: number;
  order_id: number;
  product: Product;
  articles_count: number;
  unit_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: any;
  order: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  is_active: boolean;
  created_at: string;
  category: number;
}
