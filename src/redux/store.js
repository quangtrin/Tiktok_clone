// import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './commentSlice';
import userCurrentSlice from './userCurrentSlice';
import socketSlice from './socketSlice';
import videoCurrentSlice from './videoCurrentSlice';

export const store = configureStore({
    reducer: {
        comment: commentSlice,
        user_current: userCurrentSlice,
        socket: socketSlice,
        video_current: videoCurrentSlice
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false}),
})

export default store;
