import PageLayout from "../components/PageLayout";
import Topic from "../types/Topic";
import MainTopicItem from "../components/MainTopicItem";
import NewPostField from "../components/NewPostField";
import { getTopics } from "../api/topics";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostCreationPage: React.FC = () => {
    const { topicname } = useParams();

    const [topics, setTopics] = useState<Topic[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setReady(false);
        if (topicname === undefined) {
            setError("no topic name??");
            return;
        }
        getTopics(topicname)
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
    if (!topics || topics.length === 0) {
        return <div>{"no topic"}</div>;
    }

    return (
        <PageLayout>
            <MainTopicItem topic={topics[0]} />
            <NewPostField topic={topics[0]} />
        </PageLayout>
    );
};

export default PostCreationPage;
