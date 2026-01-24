import PageLayout from "../components/PageLayout";
import Post from "../types/Post";
import MainPostItem from "../components/MainPostItem";
import Comment from "../types/Comment";
import MainCommentList from "../components/MainCommentList";
import NewCommentField from "../components/NewCommentField";
import { getCommentsByPostId } from "../api/comments";
import { getPost } from "../api/posts";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostPage: React.FC = () => {
    const { pid } = useParams();

    const [posts, setPosts] = useState<Post[] | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        setReady(false);
        if (pid === undefined) {
            setError("no post id??");
            return;
        }
        Promise.all([getPost(Number(pid)), getCommentsByPostId(Number(pid))])
            .then(([posts, comments]) => {
                setPosts(posts);
                setComments(comments.sort((a, b) => b.cdate.valueOf() - a.cdate.valueOf())); // most recent first
            })
            .catch((err) => setError(err))
            .finally(() => setReady(true));
    }, [refresh]);

    if (!ready) {
        return <div>{"BE PATIENT"}</div>;
    }
    if (error) {
        return <div>{"oh no theres an error, here it is: " + error}</div>;
    }
    if (!posts || posts.length === 0) {
        return <div>{"no post"}</div>;
    }
    if (!comments) {
        return <div>{"no comments"}</div>;
    }

    return (
        <PageLayout>
            <MainPostItem post={posts[0]} />
            <NewCommentField post={posts[0]} setRefresh={setRefresh} />
            <MainCommentList comments={comments} />
        </PageLayout>
    );
};

export default PostPage;
