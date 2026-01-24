import BannerAccountButton from "./BannerAccountButton";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const Banner: React.FC = () => {
    return (
        <Card sx={{ marginBottom: "1rem" }}>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography
                        variant="h4"
                        color="textPrimary"
                        component={Link}
                        to={"/"}
                        sx={{ textDecoration: "none" }}
                    >
                        {"my forum"}
                    </Typography>
                    <BannerAccountButton />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Banner;
