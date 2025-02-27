import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import characterReducer from '../slices/characterSlice';
import searchReducer from '../slices/searchSlice';
import themeSlice from '../slices/themeSlice';

// Create the root reducer separately
export const rootReducer = combineReducers({
  characters: characterReducer,
  search: searchReducer,
  theme: themeSlice,
});

// Function to set up the store
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState, // Passing preloadedState for initial state
  });
};

export default setupStore;
