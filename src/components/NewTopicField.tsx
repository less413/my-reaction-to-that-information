import Topic from "../types/Topic";
import { postTopic } from "../api/topics";
import { useAuth } from "../context/AuthContext";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";

const NewTopicField: React.FC = () => {
    const { currentUser } = useAuth();
    const canEdit = currentUser !== null && currentUser.role === "admin";

    if (!canEdit) {
        return (
            <Card className={"main-card"}>
                <CardContent>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        {"only admins are allowed to create new topics."}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const NOERROR = "";

    const [titleText, setTitleText] = useState("");
    const [text, setText] = useState("");
    const [ready, setReady] = useState(true);
    const [error, setError] = useState("");
    const [titleError, setTitleError] = useState("");
    const navigate = useNavigate();

    function clearHelpText(): void {
        setError(NOERROR);
        setTitleError(NOERROR);
    }

    function validateInput(): boolean {
        clearHelpText();
        if (!/^[0-9A-Za-z]+$/.test(titleText)) {
            setTitleError("title may only contain alphabets and numbers");
            return false;
        }
        return true;
    }

    async function handleCreateButtonClick(): Promise<void> {
        setReady(false);
        if (!validateInput()) {
            setReady(true);
            return;
        }
        const t: Topic = {
            topicname: titleText,
            description: text,
        };
        postTopic(t)
            .then(() => navigate("/topics/" + t.topicname))
            .catch((err) => setError(err))
            .finally(() => setReady(true));
    }

    return (
        <Card className={"main-card"}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        {"create new topic"}
                    </Typography>
                    <TextField
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        fullWidth
                        label="topic name"
                        helperText={titleError}
                    />
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        fullWidth
                        minRows={4}
                        label="description"
                        helperText={error}
                    />
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate("/")}>
                    {"Cancel"}
                </Button>
                <Button size="small" onClick={handleCreateButtonClick} disabled={!ready || titleText.length == 0}>
                    {"Create Topic"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default NewTopicField;
