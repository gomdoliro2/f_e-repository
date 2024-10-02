import './App.css';
import picture1 from './img/material-symbols_search.png';
import picture2 from './img/frame.png';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('Jin_venus08');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [posts, setPosts] = useState([
    { no: 120, title: '카페인, 얼마나 도움이 될까?', author: '몬스터에너지', date: '2024.10.01', recommendations: 13 },
    { no: 114, title: '내가 엄준식을 찬양하게 된 이유', author: '기술숭배', date: '2024.10.01', recommendations: 2 },
    { no: 113, title: '엄준식, 요새 뭐하고 살고 있나?', author: '상시숭배', date: '2024.09.30', recommendations: 1 },
    { no: 112, title: '기숙사에서 누가 라면을 먹었는가', author: '농심', date: '2024.09.30', recommendations: 5 },
    { no: 111, title: '몬스터에너지 가격인상, 어디까지 오를까?', author: '사장님돈주세요', date: '2024.09.30', recommendations: 8 },
    { no: 110, title: '다 갈아엎은 썰 푼다', author: '싸개', date: '2024.09.29', recommendations: 10 },
    { no: 109, title: '하늘로 돌아간 외국 유명 가수들', author: '힘찔좌', date: '2024.09.28', recommendations: 11 },
    { no: 108, title: '노이즈캔슬링, 정말 장점만 있을까?', author: '안들려요', date: '2024.09.28', recommendations: 3 },
    { no: 107, title: '나 오늘 못잔다.', author: '과제', date: '2024.09.27', recommendations: 12 },
    { no: 106, title: '카페인 과다복용 부작용 정리', author: '졸린청년', date: '2024.09.27', recommendations: 10 },
    { no: 105, title: '우리 끝은 치킨집일까', author: 'Chris.P', date: '2024.09.27', recommendations: 21 },
  ]);

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedType, setSelectedType] = useState('작성일');

  const handleSearch = () => {
    const results = posts.filter(post => post.title.includes(searchTerm));
    setFilteredPosts(results);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    if (type === '작성일') {
      setFilteredPosts([...posts].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (type === '인기글') {
      setFilteredPosts([...posts].sort((a, b) => b.recommendations - a.recommendations));
    } else {
      setFilteredPosts(posts);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <div className="mypost" onClick={toggleMenu}>
          <p>내 게시물 <span> | </span> {username} </p>
          <img src={picture2} alt="face-symbol" className="face-icon" />
        </div>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>내 정보</li>
              <li>내 게시글</li>
              <li>임시 저장</li>
              <li>로그아웃</li>
            </ul>
          </div>
        )}
      </div>

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

      <div className="line"></div>
      <div className="posts">
        <table className="styled-table">
          <thead>
            <tr>
              <th>no</th>
              <th className="title-column">제목</th>
              <th className="author-column">작성자</th>
              <th className="date-column">작성일</th>
              <th>추천</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post, index) => (
              <tr key={index}>
                <td>{post.no}</td>
                <td className="title-column">{post.title}</td>
                <td className="author-column">{post.author}</td>
                <td className="date-column">{post.date}</td>
                <td>{post.recommendations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;