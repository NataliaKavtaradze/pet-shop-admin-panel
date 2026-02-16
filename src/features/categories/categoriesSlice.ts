

import { createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'; 
import type{ Category } from '../animals/types';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (newCategory: Category) => {
    const response = await fetch('http://localhost:3001/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    });
    return await response.json();
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:3001/categories');
    if (!response.ok) throw new Error('Failed to fetch');
    return (await response.json()) as Category[];
  }
);
export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (id: string) => {
    await fetch(`http://localhost:3001/categories/${id}`, {
      method: 'DELETE',
    });
    return id; // ვაბრუნებთ ID-ს, რომ სთეითიდანაც ამოვშალოთ
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
   
    createCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
   

deleteCategory: (state, action: PayloadAction<string>) => { 
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
        state.items = action.payload; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
    })
   
    .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload); 
    });
  },
});

export const {deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;