import api from "./caller";
import Post from "../types/Post";
import IdResponse from "../types/IdResponse";

const processDate = (post: Post) => ({ ...post, pdate: new Date(post.pdate) });

async function getPost(pid: number): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts", { params: { pid: pid } });
    return response.data.map(processDate);
}

async function getPostsByTopic(tname: string): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts", { params: { topicname: tname } });
    return response.data.map(processDate);
}

async function getPostsByUser(uname: string): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts", { params: { username: uname } });
    return response.data.map(processDate);
}

async function deletePost(pid: number): Promise<void> {
    await api.delete("/posts", { params: { pid: pid } });
}

async function postPost(post: Post): Promise<IdResponse[]> {
    const response = await api.post<IdResponse[]>("/posts", post);
    return response.data;
}

async function putPost(post: Post): Promise<void> {
    await api.put<IdResponse[]>("/posts", post);
}

export { getPost, getPostsByTopic, getPostsByUser, deletePost, postPost, putPost };
