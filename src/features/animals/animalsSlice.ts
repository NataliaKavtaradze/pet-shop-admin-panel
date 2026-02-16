import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type{ Animal } from './types';


export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async () => {
     const response = await fetch('http://localhost:3001/animals');
    const data = await response.json();
    return data;
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

export const createAnimal = createAsyncThunk(
  'animals/createAnimal',
  async (newPet: Animal) => {
    const response = await fetch('http://localhost:3001/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    });
    return await response.json();
  }
);
export const removeAnimalFromServer = createAsyncThunk(
  'animals/removeAnimal',
  async (id: string) => {
    await fetch(`http://localhost:3001/animals/${id}`, {
      method: 'DELETE',
    });
    return id; // ვაბრუნებთ ID-ს, რომ სთეითიდანაც ამოვშალოთ
  }
);
export const updateAnimal = createAsyncThunk(
  'animals/updateAnimal',
  async (updatedPet: Animal) => {
    const response = await fetch(`http://localhost:3001/animals/${updatedPet.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPet),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update animal');
    }

    return await response.json();
  }
);

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
      state.loading = true; // სანამ მონაცემები მოვა
    })
    .addCase(fetchAnimals.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload; // ანაცვლებს ძველს ახლით, გაორმაგება აღარ მოხდება
    })
    .addCase(createAnimal.fulfilled, (state, action) => {
  state.items.push(action.payload);
   })
   .addCase(removeAnimalFromServer.fulfilled, (state, action) => {
  state.items = state.items.filter((item) => item.id !== action.payload);
  })
  .addCase(updateAnimal.fulfilled, (state, action) => {
  const index = state.items.findIndex(item => item.id === action.payload.id);
  if (index !== -1) {
    state.items[index] = action.payload; // ანაცვლებს ძველ მონაცემს ახლით
  }
  })
    .addCase(fetchAnimals.rejected, (state) => {
      state.loading = false;
    });
},
});

export const { addAnimal, deleteAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;