import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import PostCreationPage from "./pages/PostCreationPage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import BasicThreadView from "./pages/BasicThreadView";
import StyledThreadView from "./pages/StyledThreadView";
import Test from "./pages/Test";

import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const Meow: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/topics/:topicname" element={<TopicPage />} />
                        <Route path="/topics/:topicname/newpost" element={<PostCreationPage />} />
                        <Route path="/posts/:pid" element={<PostPage />} />
                        <Route path="/users/:username" element={<UserPage />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/test/1" element={<BasicThreadView />} />
                        <Route path="/test/2" element={<StyledThreadView />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default Meow;
