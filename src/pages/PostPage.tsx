import Comment from "../types/Comment";
import CommentList from "../components/CommentList";
import Post from "../types/Post";
import MainPostItem from "../components/MainPostItem";
import { fetchCommentsByPostId } from "../api/comments";
import { fetchPost } from "../api/posts";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostPage: React.FC = () => {
    const { pid } = useParams();

    const [posts, setPosts] = useState<Post[] | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setReady(false);
        if (pid === undefined) {
            setError("no post id??");
            return;
        }
        Promise.all([fetchPost(Number(pid)), fetchCommentsByPostId(Number(pid))])
            .then(([posts, comments]) => {
                setPosts(posts);
                setComments(comments);
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
    if (!posts || posts.length === 0) {
        return <div>{"no post"}</div>;
    }
    if (!comments) {
        return <div>{"no comments"}</div>;
    }

    return (
        <div style={{ width: "100vw", maxWidth: "80vh", margin: "auto", textAlign: "left" }}>
            <MainPostItem post={posts[0]} />
            <CommentList comments={comments} authorhidden={false} />
        </div>
    );
};

export default PostPage;
