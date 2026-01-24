import PageLayout from "../components/PageLayout";
import NewTopicField from "../components/NewTopicField";

import React from "react";

const TopicCreationPage: React.FC = () => {
    return (
        <PageLayout>
            <NewTopicField />
        </PageLayout>
    );
};

export default TopicCreationPage;
