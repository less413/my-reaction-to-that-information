import DeleteDialogContent from "./DeleteDialogContent";
import Post from "../types/Post";
import { deletePost, putPost } from "../api/posts";
import { useAuth } from "../context/AuthContext";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    Dialog,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
    post: Post;
};

const MainPostItem: React.FC<Props> = ({ post }) => {
    const { currentUser } = useAuth();
    const canEdit = currentUser !== null && currentUser.username === post.username;
    const canDelete = currentUser !== null && (currentUser.username === post.username || currentUser.role === "admin");
    const navigate = useNavigate();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(post.content);
    const [editError, setEditError] = useState("");
    const [ready, setReady] = useState(true);

    const [content, setContent] = useState(post.content);

    function handleEditButtonClick() {
        setEditing((x) => !x);
        if (!editing) {
            setEditText(content);
        }
    }

    async function handleEditPost() {
        setReady(false);
        const p: Post = {
            ...post,
            content: editText,
        };
        putPost(p)
            .then(() => setContent(p.content))
            .then(() => setEditing(false))
            .catch((err) => setEditError(err));
        setReady(true);
    }

    async function handleDeletePost() {
        deletePost(post.pid)
            .then(() => navigate("/topics/" + post.topicname))
            .catch((err) => setDeleteError(err));
    }

    deleteError; // idk what to do with this

    function handleOpenDeleteDialog() {
        setDeleteDialogOpen(true);
    }

    function handleCloseDeleteDialog() {
        setDeleteDialogOpen(false);
    }

    return (
        <Card className={"main-card"}>
            <CardHeader
                sx={{
                    paddingBottom: 0,
                }}
                title={
                    <>
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
                    </>
                }
                action={
                    <>
                        {canEdit && (
                            <IconButton onClick={handleEditButtonClick}>
                                <EditIcon />
                            </IconButton>
                        )}
                        {canDelete && (
                            <>
                                <IconButton onClick={handleOpenDeleteDialog}>
                                    <DeleteIcon />
                                </IconButton>
                                <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                                    <DeleteDialogContent
                                        contentText="Are you sure you want to delete this post? All comments under this post will also be deleted!"
                                        handleCancel={handleCloseDeleteDialog}
                                        handleDelete={handleDeletePost}
                                    />
                                </Dialog>
                            </>
                        )}
                    </>
                }
            />
            <CardContent>
                <Typography variant="h4" color="textPrimary">
                    {post.title}
                </Typography>
                {editing ? (
                    <TextField
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        multiline
                        fullWidth
                        minRows={4}
                        helperText={editError}
                        InputProps={{
                            endAdornment: editText && (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleEditPost} disabled={!ready}>
                                        <DoneIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                ) : (
                    <Typography variant="body1" color="textPrimary">
                        {content}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default MainPostItem;
