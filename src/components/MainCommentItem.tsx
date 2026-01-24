import DeleteDialogContent from "./DeleteDialogContent";
import Comment from "../types/Comment";
import { deleteComment, putComment } from "../api/comments";
import { useAuth } from "../context/AuthContext";

import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    comment: Comment;
};

const MainCommentItem: React.FC<Props> = ({ comment }) => {
    const { currentUser } = useAuth();
    const canEdit = currentUser !== null && currentUser.username === comment.username;
    const canDelete =
        currentUser !== null && (currentUser.username === comment.username || currentUser.role === "admin");

    const [displayedComment, setDisplayedComment] = useState<Comment>(comment);

    const [deleted, setDeleted] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(comment.content);
    const [editError, setEditError] = useState("");
    const [ready, setReady] = useState(true);

    function handleEditButtonClick() {
        setEditing((x) => !x);
    }

    async function handleEditComment() {
        setReady(false);
        const c: Comment = {
            ...displayedComment,
            content: editText,
        };
        putComment(c)
            .then(() => setDisplayedComment((c) => ({ ...c, content: editText })))
            .then(() => setEditing(false))
            .catch((err) => setEditError(err));
        setReady(true);
    }

    async function handleDeleteComment() {
        deleteComment(comment.cid)
            .then(() => setDeleted(true))
            .then(handleCloseDeleteDialog)
            .catch((err) => setDeleteError(err));
    }

    deleteError; // idk what to do with this

    function handleOpenDeleteDialog() {
        setDeleteDialogOpen(true);
    }

    function handleCloseDeleteDialog() {
        setDeleteDialogOpen(false);
    }

    editing;

    // no prop drilling! no context! just replace this card with NOTHING! easy!
    if (deleted) {
        return <></>;
    }

    return (
        <Card className={"main-card"}>
            <CardHeader
                sx={{
                    paddingBottom: 0,
                }}
                title={
                    <>
                        <Typography variant="h5" color="textPrimary" component={Link} to={"/users/" + comment.username}>
                            {displayedComment.username}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {displayedComment.cdate.toLocaleString()}
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
                                        contentText="Are you sure you want to delete this comment?"
                                        handleCancel={handleCloseDeleteDialog}
                                        handleDelete={handleDeleteComment}
                                    />
                                </Dialog>
                            </>
                        )}
                    </>
                }
            />
            <CardContent>
                {editing ? (
                    <TextField
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        multiline
                        fullWidth
                        helperText={editError}
                        InputProps={{
                            endAdornment: editText && (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleEditComment} disabled={!ready}>
                                        <DoneIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                ) : (
                    <Typography variant="body1" color="textPrimary">
                        {displayedComment.content}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default MainCommentItem;
