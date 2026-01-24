import { useAuth } from "../context/AuthContext";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

const NewTopicButton: React.FC = () => {
    const { currentUser } = useAuth();
    const canPost = currentUser !== null && currentUser.role == "admin";

    if (!canPost) {
        return <></>;
    }

    return (
        <Card className={"main-card"}>
            <CardActionArea component={Link} to={"/newtopic"}>
                <CardContent>
                    <Typography variant="h6" color="textPrimary">
                        {"create a new topic?"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default NewTopicButton;
