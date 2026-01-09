import Comment from "../types/Comment";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    comment: Comment;
};

const MainCommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <Card sx={{ marginBottom: "0.5rem", marginLeft: "1rem", marginRight: "1rem" }}>
            <CardContent>
                <Typography variant="h5" color="textPrimary" component={Link} to={"/users/" + comment.username}>
                    {comment.username}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {comment.cdate.toLocaleString()}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {comment.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MainCommentItem;
