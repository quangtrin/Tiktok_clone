import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    information: {},
    listFollowingUser: [],
    listFollowedUser: [],
};

export const userCurrentSlice = createSlice({
    name: 'user_current',
    initialState,
    reducers: {
        updateInformation: (state, action) => {
            if (action.payload) state.information = action.payload;
        },
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
                (user) => user.id !== action.payload,
            );
        },
    },
});

// const followingUserFormat =

export const {
    updateTokenSession,
    updateListFollowingUser,
    updateListFollowedUser,
    addFollow,
    removeFollow,
    updateInformation,
} = userCurrentSlice.actions;

export default userCurrentSlice.reducer;
