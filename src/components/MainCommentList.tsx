import MainCommentItem from "./MainCommentItem";
import Comment from "../types/Comment";

import React from "react";

type Props = {
    comments: Comment[];
};

const MainCommentList: React.FC<Props> = ({ comments }: Props) => {
    return (
        <ul>
            {comments.map((comment) => (
                <MainCommentItem comment={comment} key={comment.cid} />
            ))}
        </ul>
    );
};

export default MainCommentList;
