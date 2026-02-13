import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../animals/types';


interface CategoriesState {
  items: Category[];
  loading: boolean;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    // აქ უნდა იყოს შენი ლოკალური API-ს მისამართი
    const response = await fetch('http://localhost:3001/categories'); 
    if (!response.ok) throw new Error('Failed to fetch');
    return (await response.json()) as Category[];
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // კატეგორიის დამატება
    createCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
    // კატეგორიის განახლება (Update) - აი ეს აკლდა სავარაუდოდ
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.items.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    // კატეგორიის წაშლა
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(cat => cat.id !== action.payload);
    },
    // სრული სიის ჩასმა (მაგალითად API-დან წამოღებისას)
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    }
  }
});

// ექსპორტი აუცილებელია, რომ სხვა ფაილებმა დაინახონ ეს ფუნქციები
export const { createCategory, updateCategory, deleteCategory, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;