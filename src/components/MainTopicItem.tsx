import Topic from "../types/Topic";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    topic: Topic;
};

const MainTopicItem: React.FC<Props> = ({ topic }) => {
    return (
        <Card sx={{ marginBottom: "0.5rem", marginLeft: "1rem", marginRight: "1rem" }}>
            <CardContent>
                <Typography variant="h6" color="textSecondary">
                    {"topic"}
                </Typography>
                <Typography variant="h2" color="textPrimary">
                    {topic.topicname}
                </Typography>
                <Typography variant="h5" color="textPrimary">
                    {topic.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MainTopicItem;
