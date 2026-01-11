import Post from "../types/Post";
import PostList from "../components/PostList";
import Comment from "../types/Comment";
import CommentList from "../components/CommentList";
import User from "../types/User";

import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

type Props = {
    user: User;
    posts: Post[];
    comments: Comment[];
};

const UserTabs: React.FC<Props> = ({ user, posts, comments }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const switchTabs = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedIndex(newValue);
    };

    return (
        <>
            <Tabs value={selectedIndex} onChange={switchTabs} sx={{ marginLeft: "1rem", marginRight: "1rem" }}>
                <Tab label={user.username + "'s posts"} />
                <Tab label={user.username + "'s comments"} />
            </Tabs>
            {selectedIndex == 0 && <PostList posts={posts} authorhidden={true} />}
            {selectedIndex == 1 && <CommentList comments={comments} authorhidden={true} />}
        </>
    );
};

export default UserTabs;
