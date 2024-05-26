import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    information: {},
    listFollowingUser: [],
    listFollowedUser: [],
    listFriend: [],
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
        updateListFriend: (state, action) => {
            if (action.payload) {
                state.listFriend = action.payload;
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
        userCurrentClear: (state, action) => {
            state.information = {};
            state.listFollowingUser = [];
            state.listFollowedUser = [];
        }
    },
});

// const followingUserFormat =

export const {
    updateTokenSession,
    updateListFollowingUser,
    updateListFollowedUser,
    updateListFriend,
    addFollow,
    removeFollow,
    updateInformation,
    userCurrentClear
} = userCurrentSlice.actions;

export default userCurrentSlice.reducer;
