// import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import commentSlice from './commentSlice';
import userCurrentSlice from './userCurrentSlice';

// export const store = configureStore({
//     reducer: {
//         comment: commentSlice,
//         user_current: userCurrentSlice
//     }
// })
const rootReducer = combineReducers({
    comment: commentSlice,
    user_current: userCurrentSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['comment', 'user_current'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
