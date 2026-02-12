export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
