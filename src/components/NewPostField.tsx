import Topic from "../types/Topic";
import Post from "../types/Post";
import { postPost } from "../api/posts";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";

type Props = {
    topic: Topic;
};

const NewPostField: React.FC<Props> = ({ topic }) => {
    const [titleText, setTitleText] = useState("");
    const [text, setText] = useState("");
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleCreateButtonClick(): Promise<void> {
        setReady(false);
        const p: Post = {
            pid: 0,
            username: "dogdog67",
            topicname: topic.topicname,
            title: titleText,
            content: text,
            pdate: new Date(),
        };
        postPost(p)
            .then((ids) => navigate("/posts/" + ids[0].id))
            .catch((err) => setError(err))
            .finally(() => setReady(true));
    }

    return (
        <Card className={"main-card"}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        {"create new post"}
                    </Typography>
                    <TextField
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        fullWidth
                        label="title"
                    />
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        fullWidth
                        minRows={4}
                        label="content"
                        helperText={error}
                    />
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/topics/" + topic.topicname)}>
                    {"Cancel"}
                </Button>
                <Button
                    size="small"
                    onClick={handleCreateButtonClick}
                    disabled={!ready || titleText.length == 0 || text.length == 0}
                >
                    {"Post!"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default NewPostField;
