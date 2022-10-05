/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Layout from "antd/lib/layout";
import HeaderComponent from "@everyworkflow/front-panel-bundle/Component/HeaderComponent";
import FooterComponent from "@everyworkflow/front-panel-bundle/Component/FooterComponent";

interface FrontPanelLayoutComponentProps {
    children?: JSX.Element | JSX.Element[];
}

const FrontPanelLayoutComponent = ({ children }: FrontPanelLayoutComponentProps) => {
    return (
        <Layout>
            <HeaderComponent />
            <Layout.Content>
                {children}
            </Layout.Content>
            <FooterComponent />
        </Layout>
    );
}

export default FrontPanelLayoutComponent;
