// import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './commentSlice';
import userCurrentSlice from './userCurrentSlice';
import socketSlice from './socketSlice';

export const store = configureStore({
    reducer: {
        comment: commentSlice,
        user_current: userCurrentSlice,
        socket: socketSlice,
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false}),
})

export default store;
