import Comment from "../types/Comment";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type Props = {
    comment: Comment;
    authorhidden: boolean;
};

const CommentItem: React.FC<Props> = ({ comment, authorhidden }) => {
    return (
        <Card className={"main-card"}>
            <CardActionArea component={Link} to={"/posts/" + comment.pid}>
                <CardContent>
                    {authorhidden ? (
                        <>
                            <Typography variant="subtitle1" color="textSecondary">
                                {comment.cdate.toLocaleString()}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                color="textPrimary"
                                component={Link}
                                to={"/users/" + comment.username}
                            >
                                {comment.username}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {comment.cdate.toLocaleString()}
                            </Typography>
                        </>
                    )}
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                        {comment.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CommentItem;
