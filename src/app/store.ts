import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "../features/animals/animalsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import animalCategoriesReducer from "../features/animalCategories/animalCategoriesSlice";

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    categories: categoriesReducer,
    relations: animalCategoriesReducer,
  },
});

// 🔥 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
