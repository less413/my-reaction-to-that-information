import Banner from "./Banner";

import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
    return (
        <div style={{ width: "100vw", maxWidth: "800px", margin: "auto", padding: "1rem" }}>
            <Banner />
            {children}
        </div>
    );
};

export default PageLayout;
