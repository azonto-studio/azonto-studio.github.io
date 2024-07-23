import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    backgroundImages: null,
    images: {
      cununie: null,
      nunta: null,
      familie: null,
      botez: null,
    },
  },
  reducers: {
    setBackgroundImages: (state, action) => {
      state.backgroundImages = action.payload;
    },
    setCategoryImages: (state, action) => {
      const { category, images } = action.payload;
      if (state.images[category] !== undefined) {
        state.images[category] = images;
      }
    },
  },
});

export const { setBackgroundImages, setCategoryImages } = imageSlice.actions;
export default imageSlice.reducer;
