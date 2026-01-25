import User from "../types/User";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    user: User;
};

const MainUserItem: React.FC<Props> = ({ user }) => {
    return (
        <Card className={"main-card"}>
            <CardContent>
                <Typography variant="h6" color="textSecondary">
                    {user.role}
                </Typography>
                <Typography color="textPrimary" variant="h2">
                    {user.username}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {"Joined " + user.joindate.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MainUserItem;
