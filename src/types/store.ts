export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'avatars' | 'frames' | 'effects' | 'badges';
  isNew?: boolean;
  discount?: number;
}