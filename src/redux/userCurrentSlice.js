import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listFollowingUser: [],
    listFollowedUser: [],
};

export const userCurrentSlice = createSlice({
    name: 'user_current',
    initialState,
    reducers: {
        updateTokenSession: (state, action) => {
            state.tokenSession = action.payload;
        },
        updateListFollowingUser: (state, action) => {
            if (action.payload) {
                state.listFollowingUser = action.payload;
            }
        },
        updateListFollowedUser: (state, action) => {
            if (action.payload) {
                state.listFollowedUser = action.payload;
            }
        },
        addFollow: (state, action) => {
            state.listFollowingUser.push(action.payload);
        },
        removeFollow: (state, action) => {
            state.listFollowingUser = state.listFollowingUser.filter(
                (user) => user.id === action.payload.following_user_id,
            );
        },
    },
});

// const followingUserFormat = 

export const { updateTokenSession, updateListFollowingUser, updateListFollowedUser, addFollow, removeFollow } = userCurrentSlice.actions;

export default userCurrentSlice.reducer;
