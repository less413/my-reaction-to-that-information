import api from "./caller";
import Topic from "../types/Topic";

async function getTopics(tname: string | undefined): Promise<Topic[]> {
    if (tname != undefined) {
        const response = await api.get<Topic[]>("/topics", { params: { topicname: tname } });
        return response.data;
    } else {
        const response = await api.get<Topic[]>("/topics");
        return response.data;
    }
}

async function deleteTopic(topicname: string): Promise<void> {
    await api.delete("/topics", { params: { topicname: topicname } });
}

async function postTopic(topic: Topic): Promise<void> {
    await api.post("/topics", topic);
}

export { getTopics, deleteTopic, postTopic };
