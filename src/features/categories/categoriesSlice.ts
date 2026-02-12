import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "./categoriesApi";
import type{ Category } from "./types";
import type { CategoryState } from "./types";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// 🔥 THUNKS

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return await fetchCategoriesAPI();
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category: Omit<Category, "id">) => {
    return await createCategoryAPI(category);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    return await updateCategoryAPI(category);
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    return await deleteCategoryAPI(id);
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error fetching categories";
      })

      // CREATE
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // UPDATE
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default categoriesSlice.reducer;
