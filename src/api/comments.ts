import api from "./caller";
import Comment from "../types/Comment";
import IdResponse from "../types/IdResponse";

const processDate = (comment: Comment) => ({ ...comment, cdate: new Date(comment.cdate) });

async function getComment(cid: number): Promise<Comment[]> {
    const response = await api.get<Comment[]>("/comments", { params: { cid: cid } });
    return response.data.map(processDate);
}

async function getCommentsByPostId(pid: number): Promise<Comment[]> {
    const response = await api.get<Comment[]>("/comments", { params: { pid: pid } });
    return response.data.map(processDate);
}

async function getCommentsByUser(uname: string): Promise<Comment[]> {
    const response = await api.get<Comment[]>("/comments", { params: { username: uname } });
    return response.data.map(processDate);
}

async function deleteComment(cid: number): Promise<void> {
    await api.delete("/comments", { params: { cid: cid } });
}

async function postComment(comment: Comment): Promise<IdResponse[]> {
    const response = await api.post("/comments", comment);
    return response.data;
}

async function putComment(comment: Comment): Promise<void> {
    await api.put("/comments", comment);
}

export { getComment, getCommentsByPostId, getCommentsByUser, deleteComment, postComment, putComment };
