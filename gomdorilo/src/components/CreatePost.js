import React, { useState } from 'react';
import picture2 from '../img/frame.png';

const Header = ({ username, setSearchTerm, toggleMenu }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSaveDraft = () => {
        console.log('임시 저장:', { title, content });
    };

    const handleCompletePost = () => {
        console.log('작성 완료:', { title, content });
    };

    return (
        <>
            <div className="header">
                <div className="logo">
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
                <input type="text" placeholder="제목을 입력하세요" value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title-input" />
                <textarea placeholder="내용을 입력하세요" value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea" />
            </div>
            <div className="button-group">
                    <button className="save" onClick={handleSaveDraft}>임시 저장</button>
                    <button className="complete" onClick={handleCompletePost}>작성 완료</button>
                </div>
        </>
    );
};

export default Header;
