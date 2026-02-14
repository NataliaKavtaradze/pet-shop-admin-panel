

import { createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'; // <--- აი ეს ხაზია კრიტიკული
import type{ Category } from '../animals/types';
import {createAsyncThunk} from '@reduxjs/toolkit';

// 1. დარწმუნდი რომ 'fetchCategories' ექსპორტირებულია
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:3001/categories');
    if (!response.ok) throw new Error('Failed to fetch');
    return (await response.json()) as Category[];
  }
);

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // ჩვეულებრივი რედიუსერები
    createCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
   // src/features/categories/categoriesSlice.ts

deleteCategory: (state, action: PayloadAction<string>) => { // <--- აქ აუცილებლად მიუთითე string
  state.items = state.items.filter(cat => cat.id !== action.payload);
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // მონაცემების ჩაწერა
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export const { createCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;