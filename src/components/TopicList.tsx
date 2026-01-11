import TopicItem from "./TopicItem";
import Topic from "../types/Topic";

import React from "react";

type Props = {
    topics: Topic[];
};

const TopicList: React.FC<Props> = ({ topics }: Props) => {
    return (
        <ul>
            {topics.map((topic) => (
                <TopicItem topic={topic} key={topic.topicname} />
            ))}
        </ul>
    );
};

export default TopicList;
