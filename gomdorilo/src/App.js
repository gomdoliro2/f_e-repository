import './App.css';
import picture1 from './img/material-symbols_search.png';
import picture2 from './img/frame.png';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('Jin_venus08');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
  ]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = () => {
    const results = posts.filter(post => post.includes(searchTerm));
    setFilteredPosts(results);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <p>BamGallary</p>
        </div>
        <div className="search">
          <input id="search-bar" type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <img src={picture1} alt="search-symbol" className="search-icon" onClick={handleSearch} />
        </div>
        <div className="mypost">
          <p>내 게시물 <span> | </span> {username} </p>
          <img src={picture2} alt="face-symbol" className="face-icon" />
        </div>
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
