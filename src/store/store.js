
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../slices/characterSlice';
import searchReducer from '../slices/searchSlice';
import themeSlice from '../slices/themeSlice';

const store = configureStore({
    reducer: {
        characters: characterReducer,
        search: searchReducer,
        theme: themeSlice
    }
});

export default store;
