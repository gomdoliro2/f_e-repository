import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { deleteBoard } from '../api.js'; 
import picture2 from '../img/frame.png';
import picture3 from '../img/heart.png';
import picture4 from '../img/arrow.png';
import '../styled_components/Post.css';

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id = '', title = '', content = '' } = location.state || {};
    const username = localStorage.getItem('username') || 'Jin_venus08';

    const [postTitle] = useState(title);
    const [postContent] = useState(content);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = () => {
        console.log("수정할 포스트 ID:", id);
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

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log('현재 토큰:', token); 
    }, []);

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
                    <button className="sum-button">
                        <img src={picture4} alt="arrow" className="arrow" />요약하기</button>
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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={picture3} alt="heart" id="heart" />
                            </div>
                        </div>
                        <div id="comm">
                            추천
                            <div id="small">0</div>
                        </div>
                        <div id="comm">
                            댓글
                            <div id="small">0</div> 
                        </div>
                        <div className="author-details">
                            <p id="postwrite">{username}</p>
                            <button className="follow-button">팔로우</button>
                        </div>
                        <img src={picture2} alt="face-symbol" className="author-image" />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">이 글을 삭제하시겠습니까?</p>
                        <button className="cancel-button" onClick={cancelDelete}>취소</button>
                        <button className="modal-delete-button" onClick={handlePostDelete}>삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;