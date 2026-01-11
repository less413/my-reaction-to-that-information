import Topic from "../types/Topic";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type Props = {
    topic: Topic;
};

const NewPostField: React.FC<Props> = ({ topic }) => {
    return (
        <Card sx={{ marginBottom: "0.5rem", marginLeft: "1rem", marginRight: "1rem" }}>
            <CardActionArea component={Link} to={"/topics/" + topic.topicname + "/newpost"}>
                <CardContent>
                    <Typography variant="h6" color="textPrimary">
                        {"write a new post?"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default NewPostField;
