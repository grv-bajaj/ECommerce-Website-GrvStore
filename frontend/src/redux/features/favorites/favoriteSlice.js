import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {    
    addToFavorites: (state, action) => {
      // Checkif the product is not already favorites
      const product = action.payload;
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(product);
      }
    },
    removeFromFavorites: (state, action) => {
      // Remove the product with the matching ID
      const productId = action.payload._id;
      return state.filter((item) => item._id !== productId);
    },
    setFavorites: (state, action) => {
      // Set the favorites from localStorage
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;