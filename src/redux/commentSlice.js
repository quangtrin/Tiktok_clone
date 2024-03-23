import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    replyCurrentId: -1,
    listCommentCurrent: [
        {
            comment_child: [],
            User: {
                username: '',
            },
        },
    ],
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        changeReplyCurrent: (state, action) => {
            state.replyCurrentId = action.payload;
        },
        updateListCommentCurrent: (state, action) => {
            state.listCommentCurrent = action.payload;
        },
        addComment: (state, action) => {
            const newComment = [action.payload, ...state.listCommentCurrent];
            state.listCommentCurrent = newComment;
        },
        addCommentChild: (state, action) => {
            state.listCommentCurrent.map((comment) => {
                if (comment.id == action.payload.comment_parent_id) {
                    if (!comment.comment_child) comment.comment_child = [];
                    comment.comment_child.push(action.payload);
                }
            });
        },
    },
});

export const { changeReplyCurrent, updateListCommentCurrent, addComment, addCommentChild } = commentSlice.actions;

export default commentSlice.reducer;
