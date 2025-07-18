import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "../redux/features/favorites/favoriteSlice.js";
import cartSliceReducter from "./features/cart/cartSlice.js";
import shopReducer from "./features/shop/shopSlice.js";
import { getFavoritesFromLocalStorage } from "../utils/localStorage";

// Initialize favorites from localStorage
const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducter,
        shop: shopReducer,
    },

    preloadedState: {
        favorites: initialFavorites, // Set initial state for favorites from localStorage
    },
    
    // Adding the apiSlice middleware to the store
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch);
export default store;