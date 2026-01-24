import React from "react";
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";

type Props = {
    contentText: string;
    handleCancel: () => void;
    handleDelete: () => Promise<void>;
};

const DeleteDialogContent: React.FC<Props> = ({ contentText, handleCancel, handleDelete }) => {
    return (
        <>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>{"Cancel"}</Button>
                <Button onClick={handleDelete}>{"Delete"}</Button>
            </DialogActions>
        </>
    );
};

export default DeleteDialogContent;
