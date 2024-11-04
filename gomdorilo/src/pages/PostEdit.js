import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import '../styled_components/CreatePost.css';
import picture3 from '../img/eye.png';
import picture4 from '../img/Vector.png';
import { updateBoard } from '../api.js';

const PostEdit = () => {
    const location = useLocation();
    const { id, title, content } = location.state || { id: '', title: '', content: '' };
    const [newBoard, setNewBoard] = useState({ title, content });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const username = localStorage.getItem('username') || 'Jin_venus08';
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!newBoard.title || !newBoard.content) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            console.log('Updating board:', { id, ...newBoard, username, isPublic });
            const updatedBoard = await updateBoard({ id, ...newBoard, username, isPublic });
            console.log('게시글이 수정되었습니다:', updatedBoard);

            navigate(`/post/${id}`, { state: { id, title: newBoard.title, content: newBoard.content } });
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            alert('게시글 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleTempSave = () => {
        alert('게시글이 임시 저장되었습니다.');
    };

    const handleCompletePost = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFinalizePost = async () => {
        await handleSave();
        handleCloseModal();
    };

    return (
        <>
            <Header username={username} />
            <div className="post-form">
                <input
                    type="text"
                    className="title-input"
                    placeholder="제목을 입력하세요"
                    value={newBoard.title}
                    onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                />
                <textarea
                    className="text-area"
                    placeholder="내용을 입력하세요"
                    value={newBoard.content}
                    onChange={(e) => setNewBoard({ ...newBoard, content: e.target.value })}
                />
            </div>
            <div className="button-group">
                <button className="button temp-save" onClick={handleTempSave}>임시 저장</button>
                <button className="button complete" onClick={handleCompletePost}>작성 완료</button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-contents">
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <h2 className="main-title">작성을 완료하시겠습니까?</h2>
                        <div className="toggle-group">
                            <button onClick={() => setIsPublic(true)} className={isPublic ? 'active' : ''}>
                                <img src={picture3} alt="public icon" width="30%" /> 공개
                            </button>
                            <button onClick={() => setIsPublic(false)} className={!isPublic ? 'active' : ''}>
                                <img src={picture4} alt="private icon" width="18%" /> 비공개
                            </button>
                        </div>
                        <button className="finalize-button" onClick={handleFinalizePost}>작성 완료</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostEdit;