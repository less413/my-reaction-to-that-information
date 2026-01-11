import Post from "../types/Post";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    post: Post;
};

const MainPostItem: React.FC<Props> = ({ post }) => {
    return (
        <Card sx={{ marginBottom: "0.5rem", marginLeft: "1rem", marginRight: "1rem" }}>
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    {"posted under "}
                    <Link to={"/topics/" + post.topicname} style={{ color: "inherit" }}>
                        {post.topicname}
                    </Link>
                </Typography>
                <Typography variant="h5" color="textPrimary" component={Link} to={"/users/" + post.username}>
                    {post.username}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {post.pdate.toLocaleString()}
                </Typography>
                <Typography variant="h4" color="textPrimary">
                    {post.title}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MainPostItem;
