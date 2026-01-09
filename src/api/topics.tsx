import api from "./caller";
import Topic from "../types/Topic";

async function fetchTopics(tname: string | undefined): Promise<Topic[]> {
    if (tname != undefined) {
        const response = await api.get<Topic[]>("/topics", { params: { topicname: tname } });
        return response.data;
    } else {
        const response = await api.get<Topic[]>("/topics");
        return response.data;
    }
}

export default fetchTopics;
