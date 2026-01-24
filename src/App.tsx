import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import PostCreationPage from "./pages/PostCreationPage";
import TopicCreationPage from "./pages/TopicCreationPage";
import { AuthProvider } from "./context/AuthContext";

import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: green,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ".main-card": {
                    marginBottom: "0.5rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    wordBreak: "break-all",
                },
            },
        },
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/topics/:topicname" element={<TopicPage />} />
                            <Route path="/newtopic" element={<TopicCreationPage />} />
                            <Route path="/topics/:topicname/newpost" element={<PostCreationPage />} />
                            <Route path="/posts/:pid" element={<PostPage />} />
                            <Route path="/users/:username" element={<UserPage />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
