import axios from 'axios';

const API_BASE_URL = 'https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app';

// 기본 설정
axios.defaults.baseURL = API_BASE_URL;

// 토큰 저장
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 게시글 저장
export const saveBoard = async (boardData) => {
    try {
        const response = await axios.post(`/board/save`, boardData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('게시글 저장 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('게시글 저장 중 오류 발생:', error);
        throw error;
    }
};

// 게시글 수정
export const updateBoard = async (requestData) => {
    try {
        const response = await axios.put(`/board/update`, {
            id: requestData.id,
            title: requestData.title,
            content: requestData.content,
        }, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('게시글 수정 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('게시글 수정 중 오류 발생:', error);
        throw error;
    }
};

// 게시글 삭제
export const deleteBoard = async (boardId) => {
    try {
        const response = await axios.delete(`/board/delete/${boardId}`);
        console.log('게시글 삭제 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error);
        throw error;
    }
};

// 특정 게시글 조회
export const getBoardById = async (id) => {
    try {
        const response = await axios.get(`/board/get/${id}`);
        console.log('게시글 조회 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('특정 게시글 조회 중 오류 발생:', error);
        throw error;
    }
};

// 모든 게시글 조회
export const getAllBoards = async () => {
    try {
        const response = await axios.get(`/board`);
        console.log('모든 게시글 조회 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('모든 게시글 조회 중 오류 발생:', error);
        throw error;
    }
};

// 댓글 수정
export const updateComment = async (commentId, content) => {
    try {
        const requestData = { comment_id: commentId, content };
        const response = await axios.put(`/comments/update`, requestData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('댓글 수정 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('댓글 수정 중 오류 발생:', error);
        throw error;
    }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`/comments/delete/${commentId}`);
        console.log('댓글 삭제 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
        throw error;
    }
};


// 댓글 작성
export const commentData = async (boardId, commentData) => {
    try {
        const response = await axios.post(`/board/${boardId}/comments`, { content: commentData.content }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('댓글 작성 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error("댓글 작성 오류:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// 부모 댓글에 대한 자식 댓글 생성
export const createChildComment = async (commentId, content) => {
    try {
        const response = await axios.post(`/comments/${commentId}`, { content }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('자식 댓글 작성 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('자식 댓글 작성 중 오류 발생:', error);
        throw error;
    }
};

// 특정 댓글의 대댓글 조회
export const getRepliesByCommentId = async (parentId) => {
    try {
        const response = await axios.get(`/comments/${parentId}`);
        console.log('대댓글 조회 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('대댓글 조회 중 오류 발생:', error);
        throw error;
    }
};