/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Layout from "antd/lib/layout";
import HeaderComponent from "@everyworkflow/store-panel-bundle/component/header-component";
import FooterComponent from "@everyworkflow/store-panel-bundle/component/footer-component";

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
