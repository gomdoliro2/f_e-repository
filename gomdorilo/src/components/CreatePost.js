import React, { useState } from 'react';
import picture2 from '../img/frame.png';
import picture3 from '../img/eye.png';
import picture4 from '../img/Vector.png';


const Header = ({ username, setSearchTerm, toggleMenu }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(true); 
    const [date] = useState('2024.10.01');

    const handleSaveDraft = () => {
        console.log('임시 저장:', { title, content });
    };

    const handleCompletePost = () => {
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }
        setIsModalOpen(true);
    };

    const handleFinalizePost = () => {
        console.log('작성 완료:', { title, content, isPublic });
        setTitle('');
        setContent('');
        setIsModalOpen(false);
        window.open('/'); 
    };

    const handleLogoClick = () => {
        window.open('/');
    };

    return (
        <>
            <div className="header">
                <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    <p>BamGallary</p>
                </div>
                <div className="search">
                    <input
                        id="search-bar"
                        type="text"
                        placeholder="검색어를 입력하세요"
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ opacity: 0 }}
                    />
                </div>
                <div className="mypost" onClick={toggleMenu}>
                    <p>임시저장된 글 <span> | </span> Jin_venus08</p>
                    <img src={picture2} alt="face-symbol" className="face-icon" />
                </div>
            </div>
            <div className="post-form">
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title-input"
                />
                <textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea"
                />
            </div>
            <div className="button-group">
                <button className="save" onClick={handleSaveDraft}>임시 저장</button>
                <button className="complete" onClick={handleCompletePost}>작성 완료</button>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>X</button>
                        <p id="main-title">작성을 완료하시겠습니까?</p>
                        <div className="toggle-group">
                            <button onClick={() => setIsPublic(true)} className={isPublic ? 'active' : ''}>
                                <img src={picture3} alt="public icon" width="30%" /> 공개
                            </button>
                            <button onClick={() => setIsPublic(false)} className={!isPublic ? 'active' : ''}>
                                <img src={picture4} alt="private icon" width="18%" /> 비공개
                            </button>
                        </div>
                        <div className="info">
                            <p>작성자 : {username}</p>
                            <p>작성일 : {date}</p>
                        </div>
                        <button id="OK" onClick={handleFinalizePost}>작성 완료</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
