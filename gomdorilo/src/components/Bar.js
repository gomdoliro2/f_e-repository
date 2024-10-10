import React from 'react';
import '../styled_components/Bar.css'; 
import Header from './Header.js';

const Bar = ({ username, searchTerm, setSearchTerm, handleSearch, toggleMenu, selectedType, handleTypeClick }) => {
    return (
        <div>
            <Header 
                username={username} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                toggleMenu={toggleMenu} 
            />
            <div className="type-container">
                {['작성일', '인기글', '팔로우'].map(type => (
                    <div 
                        key={type} 
                        className="type-item" 
                        onClick={() => handleTypeClick(type)}
                    >
                        <p className={`type-text ${selectedType === type ? 'selected' : ''}`}>
                            {type}
                        </p>
                        {selectedType === type && <div className="underline" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bar;