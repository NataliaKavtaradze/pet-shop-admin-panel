export interface Animal {
  id: number;
  name: string;
  priceUSD: number;
  priceGEL: number;
  description: string;
  isPopular: boolean;
  stock: number;
}

export interface AnimalState {
  animals: Animal[];
  loading: boolean;
  error: string | null;
}
