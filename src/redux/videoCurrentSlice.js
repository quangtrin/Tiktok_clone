import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: -1,
};

export const videoCurrentSlice = createSlice({
    name: 'video_current',
    initialState,
    reducers: {
        updateVideoCurrentId: (state, action) => {
            state.id = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateVideoCurrentId } = videoCurrentSlice.actions;

export default videoCurrentSlice.reducer;
