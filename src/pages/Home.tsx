import Topic from "../types/Topic";
import TopicList from "../components/TopicList";
import fetchTopics from "../api/topics";

import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [topics, setTopics] = useState<Topic[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setReady(false);
        fetchTopics(undefined)
            .then(setTopics)
            .catch((err) => setError(err.message))
            .finally(() => setReady(true));
    }, []);

    if (!ready) {
        return <div>{"BE PATIENT"}</div>;
    }
    if (error) {
        return <div>{"oh no theres an error, here it is: " + error}</div>;
    }
    if (!topics || topics.length === 0) {
        return <div>{"no topic"}</div>;
    }
    return (
        <div style={{ width: "100vw", maxWidth: "80vh", margin: "auto", textAlign: "left" }}>
            <TopicList topics={topics} />
        </div>
    );
};

export default Home;
