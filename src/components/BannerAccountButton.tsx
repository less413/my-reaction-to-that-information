import BannerLoginField from "./BannerLoginField";
import BannerLoggedInMenu from "./BannerLoggedInMenu";
import { useAuth } from "../context/AuthContext";

import React, { useState } from "react";
import { Button, Popover, Typography } from "@mui/material";

const BannerAccountButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null); // anchor position of Popover
    const { currentUser } = useAuth();

    const open = Boolean(anchorEl);

    function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }

    if (currentUser === null) {
        // not logged in
        return (
            <div>
                <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    sx={{ textDecoration: "none", textTransform: "none" }}
                    component={Button}
                    onClick={handleButtonClick}
                >
                    {"log in / sign up?"}
                </Typography>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <BannerLoginField />
                </Popover>
            </div>
        );
    }
    return (
        // logged in
        <div>
            <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ textDecoration: "none", textTransform: "none" }}
                component={Button}
                onClick={handleButtonClick}
            >
                {"logged in as " + currentUser.username}
            </Typography>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <BannerLoggedInMenu />
            </Popover>
        </div>
    );
};

export default BannerAccountButton;
