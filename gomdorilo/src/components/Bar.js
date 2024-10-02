import React from 'react';

const Bar = ({ selectedType, handleTypeClick }) => {
    return (
        <div className="type">
            <div className="type-item" onClick={() => handleTypeClick('작성일')}>
                <p id="date" style={{ color: selectedType === '작성일' ? '#000' : '#666' }}> 작성일 </p>
                {selectedType === '작성일' && <div className="underline" />}
            </div>
            <div className="type-item" onClick={() => handleTypeClick('인기글')}>
                <p id="fame" style={{ color: selectedType === '인기글' ? '#000' : '#666' }}> 인기글 </p>
                {selectedType === '인기글' && <div className="underline" />}
            </div>
            <div className="type-item" onClick={() => handleTypeClick('팔로우')}>
                <p id="follow" style={{ color: selectedType === '팔로우' ? '#000' : '#666' }}> 팔로우</p>
                {selectedType === '팔로우' && <div className="underline" />}
            </div>
            <button className="new">새 글 작성</button>
        </div>
    );
};

export default Bar;
