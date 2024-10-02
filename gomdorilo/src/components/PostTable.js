import React from 'react';

const PostTable = ({ filteredPosts }) => {
    return (
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
    );
};

export default PostTable;
