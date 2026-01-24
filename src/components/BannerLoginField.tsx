import AuthLogin from "../types/AuthLogin";
import { postLogin, postSignUp } from "../api/auth";
import { useAuth } from "../context/AuthContext";

import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";

const BannerLoginField: React.FC = () => {
    const NOERROR = "";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [usernameError, setUsernameError] = useState<string>(NOERROR);
    const [passwordError, setPasswordError] = useState<string>(NOERROR);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>(NOERROR);
    const [signUp, setSignUp] = useState(false);
    const [ready, setReady] = useState(true);

    const { updateCurrentUser } = useAuth();

    function clearHelpText(): void {
        setUsernameError(NOERROR);
        setPasswordError(NOERROR);
        setPasswordConfirmationError(NOERROR);
    }

    function switchMode(): void {
        setReady(false);
        clearHelpText();
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        setSignUp((signUp) => !signUp);
        setReady(true);
    }

    function validateSignUpInput(): boolean {
        clearHelpText();
        if (username.length > 8) {
            setUsernameError("username must be 8 characters or less");
            return false;
        }
        if (username.length == 0) {
            setUsernameError("username cannot be empty");
            return false;
        }
        if (!/^[0-9A-Za-z]+$/.test(username)) {
            setUsernameError("username may only contain alphabets and numbers");
            return false;
        }
        if (password.length < 12) {
            setPasswordConfirmationError("password must be 12 characters or more");
            return false;
        }
        if (password !== passwordConfirmation) {
            setPasswordConfirmationError("passwords do not match");
            return false;
        }
        return true;
    }

    async function handleSignUp() {
        setReady(false);
        if (!validateSignUpInput()) {
            setReady(true);
            return;
        }
        const l: AuthLogin = {
            username: username,
            password: password,
        };
        postSignUp(l)
            .then(updateCurrentUser)
            .catch((err) => setPasswordConfirmationError(err));
        setReady(true);
    }

    function handleLogIn() {
        setReady(false);
        clearHelpText();
        const l: AuthLogin = {
            username: username,
            password: password,
        };
        postLogin(l)
            .then(updateCurrentUser)
            .catch((err) => setPasswordError(err));
        setReady(true);
    }

    return (
        <Card sx={{ width: "20rem" }}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="body1" color="textPrimary" gutterBottom>
                        {signUp ? "sign up" : "log in"}
                    </Typography>
                    <TextField
                        size="small"
                        margin="dense"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        label="username"
                        helperText={usernameError}
                    />
                    <TextField
                        size="small"
                        margin="dense"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        label="password"
                        helperText={passwordError}
                    />
                    {signUp && (
                        <TextField
                            size="small"
                            margin="dense"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            fullWidth
                            label="confirm password"
                            helperText={passwordConfirmationError}
                        />
                    )}
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ textDecoration: "none", textTransform: "none" }}
                    component={Button}
                    onClick={switchMode}
                    disabled={!ready}
                >
                    {signUp ? "have an account? log in" : "no account yet? create one"}
                </Typography>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ textDecoration: "none", textTransform: "none" }}
                    component={Button}
                    onClick={signUp ? handleSignUp : handleLogIn}
                    disabled={!ready}
                >
                    {signUp ? "sign up" : "log in"}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default BannerLoginField;
