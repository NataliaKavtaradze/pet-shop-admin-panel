import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRelationsAPI,
  addRelationAPI,
  deleteRelationAPI,
} from "./animalCategoriesAPI";
import type {
  AnimalCategory,
  AnimalCategoryState,
} from "./types";

const initialState: AnimalCategoryState = {
  relations: [],
  loading: false,
  error: null,
};

export const fetchRelations = createAsyncThunk(
  "relations/fetchRelations",
  async () => {
    return await fetchRelationsAPI();
  }
);

export const addRelation = createAsyncThunk(
  "relations/addRelation",
  async (relation: Omit<AnimalCategory, "id">) => {
    return await addRelationAPI(relation);
  }
);

export const deleteRelation = createAsyncThunk(
  "relations/deleteRelation",
  async (id: number) => {
    return await deleteRelationAPI(id);
  }
);

const animalCategoriesSlice = createSlice({
  name: "relations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelations.fulfilled, (state, action) => {
        state.relations = action.payload;
      })
      .addCase(addRelation.fulfilled, (state, action) => {
        state.relations.push(action.payload);
      })
      .addCase(deleteRelation.fulfilled, (state, action) => {
        state.relations = state.relations.filter(
          (r) => r.id !== action.payload
        );
      });
  },
});

export default animalCategoriesSlice.reducer;
