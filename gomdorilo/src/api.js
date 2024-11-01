import axios from 'axios';

const API_BASE_URL = 'https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app';

// 게시글 저장
export const saveBoard = async (boardData) => {
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
        alert('게시글을 작성하였습니다');
        return null; 
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/board/save`, boardData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Status code:", error.response.status);
        } else {
            console.error("An error occurred:", error.message);
        }
        throw error;
    }
};

// 게시글 수정
export const updateBoard = async (requestData) => {
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
        alert('게시글이 수정되었습니다');
        return null;
    }

    try {
        const response = await axios.put(`${API_BASE_URL}/board/update`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("게시글 수정 오류:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// 게시글 삭제
export const deleteBoard = async (boardId) => {
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
        alert('게시글이 삭제되었습니다');
        return null;
    }

    try {
        const response = await axios.delete(`${API_BASE_URL}/board/delete/${boardId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("게시글 삭제 오류:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// 특정 게시글 조회
export const getBoardById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/board/get/${id}`);
        return response.data; 
    } catch (error) {
        console.error("게시글 조회 오류:", error.response ? error.response.data : error.message); 
        throw error; 
    }
};

export const getAllBoards = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/board`);
        return response.data; 
    } catch (error) {
        console.error("게시글 조회 오류:", error.response ? error.response.data : error.message);
        throw error; 
    }
};

export const commentData = async (boardId, commentData) => {
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
        alert('댓글을 작성했습니다');
        return null; 
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/board/${boardId}/comments`, commentData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("댓글 작성 오류:", error.response ? error.response.data : error.message); 
        throw error; 
    }
};
