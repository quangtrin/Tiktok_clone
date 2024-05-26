import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentSidebar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { postComments } from '~/services/API/commentService';
import { addComment, updateListCommentCurrent } from '~/redux/commentSlice';
import { Avatar, Input, Form } from 'antd';
import CommentCustom from '~/components/CommentCustom/CommentCustom';
import { getCommentsByVideoId } from '~/services/API/commentService';
import { FaCircleXmark } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane as faPaperPlaneTop } from '@fortawesome/free-solid-svg-icons';
import './CommentSidebarLibrary.scss';

const cx = classNames.bind(styles);
const CommentSidebar = ({ openComment, setOpenComment }) => {
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
            <div className={cx('close-icon')} onClick={() => setOpenComment(false)}>
                <FaCircleXmark />
            </div>
            <div
                style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div style={{ width: '15%' }}>
                    <Avatar src={currentUser.avatar} alt="Han Solo" />
                </div>
                <Form style={{ width: '100%' }} form={form} name="comment-form">
                    <Form.Item name={'comment'}>
                        <Input onPressEnter={handleSubmitComment} allowClear />
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'right' }}>
                    <span onClick={handleSubmitComment} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faPaperPlaneTop} className={cx('send-icon')} />
                    </span>
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
                                        .map((child) => <CommentCustom key={child.id} comment={child} />)
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
