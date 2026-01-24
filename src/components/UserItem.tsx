import User from "../types/User";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type Props = {
    user: User;
};

const UserItem: React.FC<Props> = ({ user }) => {
    return (
        <Card className={"main-card"}>
            <CardActionArea component={Link} to={"/users/" + user.username}>
                <CardContent>
                    <Typography color="textPrimary" variant="h5">
                        {user.username}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {"Joined " + user.joindate.toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default UserItem;
