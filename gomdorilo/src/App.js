import './App.css';
import picture1 from './img/material-symbols_search.png';
import picture2 from './img/frame.png';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('Jin_venus08');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
    '카페인, 얼마나 도움이 될까?',
    '카페인 과다복용이 몸에 끼치는 영향들',
    '나 오늘 못잔다',
    '노이즈캔슬링, 정말 장점만 있을까?',
    '카페인을 조금만 먹으면 괜찮다'
  ]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedType, setSelectedType] = useState('작성일');

  const handleSearch = () => {
    const results = posts.filter(post => post.includes(searchTerm));
    setFilteredPosts(results);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <p>BamGallary</p>
        </div>
        <div className="search">
          <input
            id="search-bar"
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} />
          <img src={picture1} alt="search-symbol" className="search-icon" onClick={handleSearch} />
        </div>
        <div className="mypost">
          <p>내 게시물 <span> | </span> {username} </p>
          <img src={picture2} alt="face-symbol" className="face-icon" />
        </div>
      </div>
      <div className="type">
        <div className="type-item" onClick={() => handleTypeClick('작성일')}>
          <p id="date" style={{ color: selectedType === '작성일' ? '#000' : '#666' }}> 작성일 </p>
          {selectedType === '작성일' && <div className="underline" />}
        </div>
        <div className="type-item" onClick={() => handleTypeClick('인기글')}>
          <p id="fame" style={{ color: selectedType === '인기글' ? '#000' : '#666' }}> 인기글 </p>
          {selectedType === '인기글' && <div className="underline" />}</div>
        <div className="type-item" onClick={() => handleTypeClick('팔로우')}>
          <p id="follow" style={{ color: selectedType === '팔로우' ? '#000' : '#666' }}> 팔로우 </p>
          {selectedType === '팔로우' && <div className="underline" />}
        </div>
        <button className="new">새 글 작성</button>
      </div>
      <div className="posts">
        <ul>
          {filteredPosts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
