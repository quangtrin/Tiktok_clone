import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentSidebar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { postComments } from '~/services/API/commentService';
import { addComment, updateListCommentCurrent } from '~/redux/commentSlice';
import { Avatar, Input, Form } from 'antd';
import Button from '~/components/Button/Button';
import CommentCustom from '~/components/CommentCustom/CommentCustom';
import { getCommentsByVideoId } from '~/services/API/commentService';
import './CommentSidebarLibrary.scss';

const cx = classNames.bind(styles);
const CommentSidebar = ({ openComment }) => {
    const dispatch = useDispatch();
    const firstContentRef = useRef(null);
    const [form] = Form.useForm();
    const currentUser = useSelector((state) => state.user_current.information);
    const videoCurrentId = useSelector((state) => state.video_current.id);
    const listComment = useSelector((state) => state.comment.listCommentCurrent);
    const socket = useSelector((state) => state.socket.socket);

    const handleSubmitComment = async () => {
        const content = form.getFieldValue('comment');
        if (videoCurrentId && content && content !== '') {
            try {
                const newComment = await postComments(videoCurrentId, content, socket);
                dispatch(addComment(newComment));
                form.setFieldValue('comment', '');
                firstContentRef.current.scrollIntoView();
            } catch (error) {}
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const commentsVideo = await getCommentsByVideoId(videoCurrentId);
            dispatch(updateListCommentCurrent(commentsVideo));
        };

        if (videoCurrentId) fetchData();
    }, [videoCurrentId, dispatch, socket]);

    return (
        <div className={cx('comment-layout')} style={!openComment ? { display: 'none' } : {}} id="CommentSidebar">
            <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'space-between' }}>
                <div style={{ width: '15%' }}>
                    <Avatar src={currentUser.avatar} alt="Han Solo" />
                </div>
                <Form style={{ width: '100%' }} form={form} name="comment-form">
                    <Form.Item name={'comment'}>
                        <Input onPressEnter={handleSubmitComment} allowClear />
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'right' }}>
                    <Button primary onClick={handleSubmitComment} style={{ marginLeft: '1rem', minWidth: '5rem' }}>
                        Enter
                    </Button>
                </div>
            </div>
            <div className={cx('content')}>
                <div ref={firstContentRef} />
                {listComment?.map((comment, index) => {
                    if (!comment.comment_parent_id)
                        return (
                            <CommentCustom
                                key={index}
                                comment={comment}
                                children={
                                    comment.comment_child &&
                                    [...comment.comment_child]
                                        .reverse()
                                        .map((child) => (
                                            <CommentCustom
                                                key={child.id}
                                                comment={child}
                                            />
                                        ))
                                }
                            />
                        );
                    else return null;
                })}
            </div>
        </div>
    );
};

export default CommentSidebar;
