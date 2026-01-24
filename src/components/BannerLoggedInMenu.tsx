import { useAuth } from "../context/AuthContext";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, Typography } from "@mui/material";

const BannerLoggedInMenu: React.FC = () => {
    const { currentUser, updateCurrentUser } = useAuth();

    const navigate = useNavigate();

    function handleGoToAccountPage() {
        navigate("/users/" + currentUser?.username);
    }

    function handleLogout() {
        updateCurrentUser(null);
    }

    return (
        <Card>
            <CardActions>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ textDecoration: "none", textTransform: "none" }}
                    component={Button}
                    onClick={handleGoToAccountPage}
                >
                    {"my profile"}
                </Typography>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ textDecoration: "none", textTransform: "none" }}
                    component={Button}
                    onClick={handleLogout}
                >
                    {"log out"}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default BannerLoggedInMenu;
