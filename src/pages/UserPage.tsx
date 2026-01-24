import PageLayout from "../components/PageLayout";
import Post from "../types/Post";
import Comment from "../types/Comment";
import User from "../types/User";
import UserTabs from "../components/UserTabs";
import MainUserItem from "../components/MainUserItem";
import { getPostsByUser } from "../api/posts";
import { getCommentsByUser } from "../api/comments";
import { getUser } from "../api/users";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserPage: React.FC = () => {
    const { username } = useParams();

    const [users, setUsers] = useState<User[] | null>(null);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setReady(false);
        if (username === undefined) {
            setError("no username??");
            return;
        }
        Promise.all([getUser(username), getPostsByUser(username), getCommentsByUser(username)])
            .then(([users, posts, comments]) => {
                setUsers(users);
                setPosts(posts.sort((a, b) => b.pdate.valueOf() - a.pdate.valueOf())); // most recent first
                setComments(comments.sort((a, b) => b.cdate.valueOf() - a.cdate.valueOf())); // most recent first
            })
            .catch((err) => setError(err))
            .finally(() => setReady(true));
    }, [username]);

    if (!ready) {
        return <div>{"BE PATIENT"}</div>;
    }
    if (error) {
        return <div>{"oh no theres an error, here it is: " + error}</div>;
    }
    if (!users || users.length === 0) {
        return <div>{"no user"}</div>;
    }
    if (!posts) {
        return <div>{"no post"}</div>;
    }
    if (!comments) {
        return <div>{"no comments"}</div>;
    }

    return (
        <PageLayout>
            <MainUserItem user={users[0]} />
            <UserTabs user={users[0]} posts={posts} comments={comments} />
        </PageLayout>
    );
};

export default UserPage;
