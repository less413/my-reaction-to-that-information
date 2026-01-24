import PageLayout from "../components/PageLayout";
import Topic from "../types/Topic";
import TopicList from "../components/TopicList";
import NewTopicButton from "../components/NewTopicButton";
import { getTopics } from "../api/topics";

import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [topics, setTopics] = useState<Topic[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setReady(false);
        getTopics(undefined)
            .then(setTopics)
            .catch((err) => setError(err))
            .finally(() => setReady(true));
    }, []);

    if (!ready) {
        return <div>{"BE PATIENT"}</div>;
    }
    if (error) {
        return <div>{"oh no theres an error, here it is: " + error}</div>;
    }
    if (topics === null) {
        return <div>{"no topic"}</div>;
    }
    return (
        <PageLayout>
            <NewTopicButton />
            <TopicList topics={topics} />
        </PageLayout>
    );
};

export default Home;
