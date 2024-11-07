import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { deleteBoard, getBoardById, summarizePost } from '../api.js'; 
import picture2 from '../img/frame.png';
import picture3 from '../img/heart.png';
import picture4 from '../img/arrow.png';
import '../styled_components/Post.css';
import Comment from '../components/Comment.js'; 

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id = '', title = '', content = '' } = location.state || {};
    const username = localStorage.getItem('username') || 'Jin_venus08';

    const [postTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [isReturnToOriginalModalOpen, setIsReturnToOriginalModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [summary, setSummary] = useState(""); //eslint-disable-line no-unused-vars

    useEffect(() => {
        const loadComments = async () => {
            try {
                const boardData = await getBoardById(id);
                setComments(boardData.comments || []);
            } catch (error) {
                console.error("댓글 불러오기 오류:", error);
            }
        };
        loadComments();
    }, [id]);

    const handleEdit = () => {
        navigate('/post-edit', { state: { id, title: postTitle, content: postContent } });
    };

    const handleDelete = () => setIsModalOpen(true);
    const cancelDelete = () => setIsModalOpen(false);

    const handlePostDelete = async () => {
        try {
            await deleteBoard(id);
            alert('게시글이 삭제되었습니다.');
            setIsModalOpen(false);
            navigate('/main'); 
        } catch (error) {
            console.error("게시글 삭제 오류:", error);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    const handleSummarizeRequest = () => {
        if (postContent !== content) { 
            setIsReturnToOriginalModalOpen(true);
        } else {
            setIsSummaryModalOpen(true); 
        }
    };

    const handleSummarizeConfirm = async () => {
        setIsSummaryModalOpen(false);
        try {
            const response = await summarizePost(id);
            setSummary(response.content);
            setPostContent(response.content);
            alert("게시글 요약이 완료되었습니다.");
        } catch (error) {
            console.error("게시글 요약 오류:", error);
            alert("게시글 요약에 실패했습니다.");
        }
    };

    const handleReturnToOriginalConfirm = () => {
        setPostContent(content); 
        setSummary(""); 
        setIsReturnToOriginalModalOpen(false);
    };

    return (
        <div className="post-container">
            <Header username={username} />
            <div className="post-form">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                        className="title-show" 
                        value={postTitle} 
                        readOnly 
                    />
                    <button className="sum-button" onClick={handleSummarizeRequest}>
                        <img src={picture4} alt="arrow" className="arrow" />요약하기
                    </button>
                    <button className="edit-button" onClick={handleEdit}>수정</button>
                    <button className="delete-button" onClick={handleDelete}>삭제</button>
                </div>
                <div className="black-line"></div>
                <textarea 
                    className="textarea" 
                    value={postContent} 
                    readOnly
                />
                <div className="divider">
                    <div className="author-info">
                        <div id="comm">
                            <img src={picture3} alt="heart" id="heart" />
                        </div>
                        <div id="comm">
                            추천
                            <div id="small">0</div>
                        </div>
                        <div id="comm">
                            댓글
                            <div id="small">{comments.length}</div>
                        </div>
                        <div className="author-details">
                            <p id="postwrite">{username}</p>
                            <button className="follow-button">팔로우</button>
                        </div>
                        <img src={picture2} alt="face-symbol" className="author-image" />
                    </div>
                </div>
            </div>
            <Comment postId={id} />
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">이 글을 삭제하시겠습니까?</p>
                        <button className="cancel-button" onClick={cancelDelete}>취소</button>
                        <button className="modal-delete-button" onClick={handlePostDelete}>삭제</button>
                    </div>
                </div>
            )}
            {isSummaryModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">글을 요약하시겠습니까?</p>
                        <button className="cancel-button" onClick={() => setIsSummaryModalOpen(false)}>취소</button>
                        <button className="modal-confirm-button" onClick={handleSummarizeConfirm}>요약</button>
                    </div>
                </div>
            )}
            {isReturnToOriginalModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">원문을 보시겠습니까?</p>
                        <button className="cancel-button" onClick={() => setIsReturnToOriginalModalOpen(false)}>취소</button>
                        <button className="modal-confirm-button" onClick={handleReturnToOriginalConfirm}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;