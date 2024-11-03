import React from 'react';
import '../styled_components/Header.css';
import picture1 from '../img/material-symbols_search.png';
import picture2 from '../img/frame.png';

const Header = ({ authorNickname, searchTerm, setSearchTerm, handleSearch, toggleMenu }) => {
    return (
        <div className="header-content">
            <div className="logo">
                <p>BamGallary</p> 
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <img
                    src={picture1}
                    alt="search-symbol"
                    className="search-icon"
                    onClick={handleSearch} 
                />
            </div>
            <div className="my-post-container" onClick={toggleMenu}>
                <p>내 게시물 <span> | </span> {authorNickname} </p> 
                <img src={picture2} alt="face-symbol" className="face-icon" />
            </div>
        </div>
    );
};

export default Header;
