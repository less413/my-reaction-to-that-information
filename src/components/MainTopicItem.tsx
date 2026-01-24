import DeleteDialogContent from "./DeleteDialogContent";
import Topic from "../types/Topic";
import { deleteTopic } from "../api/topics";
import { useAuth } from "../context/AuthContext";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, Dialog, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    topic: Topic;
};

const MainTopicItem: React.FC<Props> = ({ topic }) => {
    const { currentUser } = useAuth();
    const canEdit = currentUser !== null && currentUser.role === "admin";
    const canDelete = canEdit;
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function handleEditButtonClick() {
        setEditing((x) => !x);
    }

    async function handleDeleteTopic() {
        deleteTopic(topic.topicname)
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    }

    function handleOpenDeleteDialog() {
        setDeleteDialogOpen(true);
    }

    function handleCloseDeleteDialog() {
        setDeleteDialogOpen(false);
    }

    editing;

    return (
        <Card className={"main-card"}>
            <CardHeader
                sx={{
                    paddingBottom: 0,
                }}
                title={
                    <>
                        <Typography variant="h6" color="textSecondary">
                            {"topic"}
                        </Typography>
                        <Typography variant="h2" color="textPrimary">
                            {topic.topicname}
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
                                        contentText="Are you sure you want to delete this topic? EVERYTHING (all posts and comments under this topic) will be deleted!"
                                        handleCancel={handleCloseDeleteDialog}
                                        handleDelete={handleDeleteTopic}
                                    />
                                </Dialog>
                            </>
                        )}
                    </>
                }
            />
            <CardContent>
                <Typography variant="h5" color="textPrimary">
                    {topic.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MainTopicItem;
