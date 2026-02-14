export interface Animal {
  id: string;
  name: string;
  priceUSD: number;
  priceGEL: number;
  stock: number;
  description: string;
  isPopular: boolean;
  categoryId: string;
}

export interface AnimalState {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}
export interface Category {
  id: string;
  title: string;
  description: string;
}
export interface AnimalWithCategory {
  id: number;
  animal_id: number;
  category_id: number;
}
