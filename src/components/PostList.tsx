import PostItem from "./PostItem";
import Post from "../types/Post";

import React from "react";

type Props = {
    posts: Post[];
    authorhidden: boolean;
};

const PostList: React.FC<Props> = ({ posts, authorhidden }: Props) => {
    return (
        <ul>
            {posts.map((post) => (
                <PostItem post={post} authorhidden={authorhidden} key={post.pid} />
            ))}
        </ul>
    );
};

export default PostList;
