import { configureStore } from '@reduxjs/toolkit'
import commentSlice from './commentSlice'
import userCurrentSlice from './userCurrentSlice'

export const store = configureStore({
    reducer: {
        comment: commentSlice,
        user_current: userCurrentSlice
    }
})