import api from "./caller";
import Comment from "../types/Comment";

async function fetchComment(cid: number): Promise<Comment[]> {
    const response = await api.get<Comment[]>("/comments", { params: { cid: cid } });
    return response.data;
}

async function fetchCommentsByPostId(pid: number): Promise<Comment[]> {
    const response = await api.get<Comment[]>("/comments", { params: { pid: pid } });
    return response.data;
}

async function fetchCommentsByUser(uname: string): Promise<Comment[]> {
    const response = await api.get<Comment[]>("/comments", { params: { topicname: uname } });
    return response.data;
}

export { fetchComment, fetchCommentsByPostId, fetchCommentsByUser };
