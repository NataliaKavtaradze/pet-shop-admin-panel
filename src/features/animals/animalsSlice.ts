import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type{ Animal } from './types';

// 1. ექსპორტი აუცილებელია აქ!
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async () => {
    // აქ დროებით დავაბრუნოთ ცარიელი მასივი ან იმიტირებული მონაცემები, 
    // სანამ რეალურ API-ს მივაბამთ
    return [] as Animal[]; 
  }
);

interface AnimalsState {
  items: Animal[];
  loading: boolean;
}

const initialState: AnimalsState = {
  items: [],
  loading: false,
};

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal: (state, action: PayloadAction<Animal>) => {
      state.items.push(action.payload);
    },
    deleteAnimal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(a => a.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action: PayloadAction<Animal[]>) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export const { addAnimal, deleteAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;