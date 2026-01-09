import api from "./caller";
import Post from "../types/Post";

async function fetchPost(pid: number): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts", { params: { pid: pid } });
    return response.data;
}

async function fetchPostsByTopic(tname: string): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts", { params: { topicname: tname } });
    return response.data;
}

async function fetchPostsByUser(uname: string): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts", { params: { topicname: uname } });
    return response.data;
}

export { fetchPost, fetchPostsByTopic, fetchPostsByUser };
