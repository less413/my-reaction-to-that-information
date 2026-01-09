import Topic from "../types/Topic";
import MainTopicItem from "../components/MainTopicItem";
import Post from "../types/Post";
import PostList from "../components/PostList";
import { fetchPostsByTopic } from "../api/posts";
import fetchTopics from "../api/topics";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const TopicPage: React.FC = () => {
    const { topicname } = useParams();

    const [topics, setTopics] = useState<Topic[] | null>(null);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setReady(false);
        if (topicname === undefined) {
            setError("no topic name??");
            return;
        }
        Promise.all([fetchTopics(topicname), fetchPostsByTopic(topicname)])
            .then(([topics, posts]) => {
                setTopics(topics);
                setPosts(posts);
            })
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
    if (!posts) {
        return <div>{"no post"}</div>;
    }

    return (
        <div style={{ width: "100vw", maxWidth: "80vh", margin: "auto", textAlign: "left" }}>
            <MainTopicItem topic={topics[0]} />
            <PostList posts={posts} authorhidden={false} />
        </div>
    );
};

export default TopicPage;
