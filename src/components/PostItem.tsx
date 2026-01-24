import Post from "../types/Post";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type Props = {
    post: Post;
    authorhidden: boolean;
};

const PostItem: React.FC<Props> = ({ post, authorhidden }) => {
    return (
        <Card className={"main-card"}>
            <CardActionArea component={Link} to={"/posts/" + post.pid}>
                <CardContent>
                    {authorhidden ? (
                        <>
                            <Typography variant="h5" color="textPrimary">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {post.pdate.toLocaleString()}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                color="textPrimary"
                                component={Link}
                                to={"/users/" + post.username}
                            >
                                {post.username}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {post.pdate.toLocaleString()}
                            </Typography>
                            <Typography variant="h4" color="textPrimary">
                                {post.title}
                            </Typography>
                        </>
                    )}
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                        {post.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PostItem;
