import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import imageReducer from './imageSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, imageReducer);

const store = configureStore({
  reducer: {
    images: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
