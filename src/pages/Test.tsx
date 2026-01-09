import Topic from "../types/Topic";
import TopicItem from "../components/TopicItem";
import MainTopicItem from "../components/MainTopicItem";
import Post from "../types/Post";
import PostItem from "../components/PostItem";
import MainPostItem from "../components/MainPostItem";
import Comment from "../types/Comment";
import CommentItem from "../components/CommentItem";
import MainCommentItem from "../components/MainCommentItem";
import User from "../types/User";
import UserItem from "../components/UserItem";
import MainUserItem from "../components/MainUserItem";

import React from "react";

const t: Topic = {
    topicname: "Tech Tech Tech TechTechTech Tech",
    description: "For technology related stuff",
};

const p: Post = {
    pid: 67,
    topicname: "Tech",
    username: "dogdog67",
    title: "I really love React and Go",
    content:
        "Any good programmer can write code that a human can understand.\n" +
        "Fools write code that computers can understand.\n" +
        " ~ Martin Fooler\n" +
        "here is a really long line of text to test if the truncation thing is working correctly because im not sure how else to do this also does the linter complain if i make this string too long? seems like it doesnt, thanks linter",
    pdate: new Date(2026, 1, 7, 6, 7, 0),
};

const c: Comment = {
    cid: 67,
    content:
        "im gonna make a reaction video\n" +
        "here is a really long line of text to test if the truncation thing is working correctly because im not sure how else to do this also does the linter complain if i make this string too long? seems like it doesnt, thanks linter",
    username: "Benedict",
    cdate: new Date(2026, 1, 7, 16, 25, 30),
    pid: 67,
};

const u: User = {
    username: "dogdog67",
    joindate: new Date(2025, 12, 8, 15, 0, 50),
};

const Test: React.FC = () => {
    return (
        <div style={{ width: "100vw", maxWidth: "80vh", margin: "auto", textAlign: "left" }}>
            <MainTopicItem topic={t} />
            <TopicItem topic={t} />
            <MainUserItem user={u} />
            <UserItem user={u} />
            <MainPostItem post={p} />
            <PostItem post={p} authorhidden={false} />
            <PostItem post={p} authorhidden={true} />
            <MainCommentItem comment={c} />
            <CommentItem comment={c} authorhidden={false} />
            <CommentItem comment={c} authorhidden={true} />
        </div>
    );
};

export default Test;
