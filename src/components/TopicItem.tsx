import Topic from "../types/Topic";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type Props = {
    topic: Topic;
};

const TopicItem: React.FC<Props> = ({ topic }) => {
    return (
        <Card className={"main-card"}>
            <CardActionArea component={Link} to={"/topics/" + topic.topicname}>
                <CardContent>
                    <Typography variant="h5" color="textPrimary">
                        {topic.topicname}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        {topic.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default TopicItem;
