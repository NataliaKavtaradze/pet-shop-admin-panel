import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAnimalsAPI,
  createAnimalAPI,
  updateAnimalAPI,
  deleteAnimalAPI,
} from "./animalsAPI";
import type { Animal, AnimalState } from "./types";

const initialState: AnimalState = {
  animals: [],
  loading: false,
  error: null,
};

// 🔥 THUNKS

export const fetchAnimals = createAsyncThunk(
  "animals/fetchAnimals",
  async () => {
    return await fetchAnimalsAPI();
  }
);

export const createAnimal = createAsyncThunk(
  "animals/createAnimal",
  async (animal: Omit<Animal, "id">) => {
    return await createAnimalAPI(animal);
  }
);

export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async (animal: Animal) => {
    return await updateAnimalAPI(animal);
  }
);

export const deleteAnimal = createAsyncThunk(
  "animals/deleteAnimal",
  async (id: number) => {
    return await deleteAnimalAPI(id);
  }
);

// 🔥 SLICE

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching animals";
      })

      // CREATE
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.animals.push(action.payload);
      })

      // UPDATE
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animals.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter(
          (a) => a.id !== action.payload
        );
      });
  },
});

export default animalsSlice.reducer;
