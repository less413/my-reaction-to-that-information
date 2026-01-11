import Post from "../types/Post";
import Comment from "../types/Comment";
import { postComment } from "../api/comments";

import React, { useState } from "react";
import { Card, CardContent, IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
    post: Post;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewCommentField: React.FC<Props> = ({ post, setRefresh }) => {
    const [text, setText] = useState("");
    const [ready, setReady] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function send(): Promise<void> {
        setReady(false);
        const c: Comment = {
            cid: 0,
            username: "dogdog67",
            pid: post.pid,
            content: text,
            cdate: new Date(),
        };
        postComment(c)
            .then(() => setText(""))
            .then(() => setRefresh((x) => !x))
            .catch((err) => setError(err.message))
            .finally(() => setReady(true));
    }

    return (
        <Card sx={{ marginBottom: "0.5rem", marginLeft: "1rem", marginRight: "1rem" }}>
            <CardContent>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    fullWidth
                    label="write a comment?"
                    helperText={error}
                    InputProps={{
                        endAdornment: text && (
                            <InputAdornment position="end">
                                <IconButton onClick={send} disabled={!ready}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default NewCommentField;
