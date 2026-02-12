export interface AnimalCategory {
  id: number;
  animal_id: number;
  category_id: number;
}

export interface AnimalCategoryState {
  relations: AnimalCategory[];
  loading: boolean;
  error: string | null;
}
