import CommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

import React, { useState } from "react";

const comments: Comment[] = [
    {
        cid: 67,
        content:
            "Any fool can write code that a computer can understand.\n" +
            "Good programmers write code that humans can understand.\n" +
            " ~ Martin Fowler",
        username: "Benedict",
        cdate: new Date(2022, 10, 28, 10, 33, 30),
        pid: 67,
    },
    {
        cid: 671,
        content:
            "Code reuse is the Holy Grail of Software Engineering.\n" +
            " ~ Douglas Crockford\n" +
            "Code reuse is the Holy Grail of Software Engineering.\n" +
            " ~ Douglas Crockford\n" +
            "Code reuse is the Holy Grail of Software Engineering.\n" +
            " ~ Douglas Crockford\n" +
            "Code reuse is the Holy Grail of Software Engineering.\n" +
            " ~ Douglas Crockford",
        username: "Casey",
        cdate: new Date(2022, 11, 1, 11, 11, 11),
        pid: 67,
    },
    {
        cid: 672,
        content: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
        username: "Dueet",
        cdate: new Date(2022, 11, 2, 10, 30, 0),
        pid: 67,
    },
];

const BasicThreadView: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    const hideButton = () => {
        setIsShowButton(false);
    };

    const showButton = () => {
        setIsShowButton(true);
    };

    return (
        <div style={{ width: "40vw", margin: "auto" }}>
            <h3>{"Inspirational Quotes"}</h3>
            <h4>{"Thread started by Aiken"}</h4>
            <CommentList comments={comments} authorhidden={false} />
            <Link to="/">{`<- Back to threads`}</Link>
            <br />
            <br />

            <Typewriter
                onInit={(typewriter) => {
                    hideButton();
                    typewriter
                        .changeDelay(4)
                        .typeString(
                            "why does this typewriter effect thing even exist? people use these????mmmmmmmmmmmmmmmmmmmmmmmmlllllllllllllllllllllmmmmmmm",
                        )
                        .callFunction(showButton)
                        .start();
                }}
            />
            {isShowButton && (
                <Button variant="contained" color="primary" component={Link} to="/thread/1/cooler">
                    {"Yes"}
                </Button>
            )}
        </div>
    );
};

export default BasicThreadView;
