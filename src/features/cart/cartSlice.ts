import type { createSlice, PayloadAction } from '@reduxjs/toolkit';

// აქ უნდა ვაკონტროლოთ რაოდენობა (quantity) და შევამოწმოთ stock.

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ animal: Animal, quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.animal.id);
      if (item) {
        const newQty = item.quantity + action.payload.quantity;
        if (newQty <= action.payload.animal.stock) {
          item.quantity = newQty;
        } else {
          toast.error("მარაგი ამოწურულია!");
        }
      } else {
        state.items.push({ ...action.payload.animal, quantity: action.payload.quantity });
      }
    },
    // Buy Now ფუნქცია: ასუფთავებს ქართს
    checkout: (state) => {
      state.items = [];
      toast.success("შეკვეთა წარმატებით დასრულდა!");
    }
  }
});