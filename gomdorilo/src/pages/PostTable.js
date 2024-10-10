import React from 'react';
import '../styled_components/PostTable.css';

const PostTable = ({ filteredPosts }) => {
    return (
        <div className="posts-container">
            <table className="styled-table">
                <thead className="table-head">
                    <tr>
                        <th>no</th>
                        <th className="title-column">제목</th>
                        <th className="author-column">작성자</th>
                        <th className="date-column">작성일</th>
                        <th>추천</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {filteredPosts.map((post, index) => (
                        <tr key={index}>
                            <td className="table-cell">{post.no}</td>
                            <td className={`table-cell title-column`}>{post.title}</td>
                            <td className={`table-cell author-column`}>{post.author}</td>
                            <td className={`table-cell date-column`}>{post.date}</td>
                            <td className="table-cell">{post.recommendations}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostTable;