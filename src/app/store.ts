// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from '../features/animals/animalsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
