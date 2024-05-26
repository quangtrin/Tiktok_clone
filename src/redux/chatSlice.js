import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatingCurrentUserId: null,
    listMessageCurrent: [],
    listChatCard: [],

};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeChatingCurrentUserId: (state, action) => {
            state.chatingCurrentUserId = action.payload;
        },
        updateListMessageCurrent: (state, action) => {
            state.listMessageCurrent = action.payload;
        },
        updateListChatCard: (state, action) => {
            state.listChatCard = action.payload;
        },
        updateRead: (state, action) => {
            const otherUserId  = action.payload;
            state.listChatCard = state.listChatCard.map((item) => {
                if (item.user_id === otherUserId) {
                    return { ...item, read: true };
                }
                return item;
            });
        }
    },
});

export const { changeChatingCurrentUserId, updateListMessageCurrent, updateListChatCard, updateRead } = chatSlice.actions;

export default chatSlice.reducer;
