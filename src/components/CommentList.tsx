import CommentItem from "./CommentItem";
import Comment from "../types/Comment";

import React from "react";

type Props = {
    comments: Comment[];
    authorhidden: boolean;
};

const CommentList: React.FC<Props> = ({ comments, authorhidden }: Props) => {
    return (
        <ul>
            {comments.map((comment) => (
                <CommentItem comment={comment} authorhidden={authorhidden} key="" />
            ))}
        </ul>
    );
};

export default CommentList;
