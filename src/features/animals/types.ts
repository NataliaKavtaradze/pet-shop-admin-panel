export interface Animal {
  id: number;
  name: string;
  priceUSD: number;
  priceGEL: number;
  description: string;
  isPopular: boolean;
  stock: number;
  imageUrl?: string;
}

export interface AnimalState {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}
export interface Category {
  id: number;
  title: string;
  description: string;
}
export interface AnimalWithCategory {
  id: number;
  animal_id: number;
  category_id: number;
}
