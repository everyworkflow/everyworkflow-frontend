/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Layout } from "antd";
import HeaderComponent from "@everyworkflow/front-panel-bundle/component/header-component";
import FooterComponent from "@everyworkflow/front-panel-bundle/component/footer-component";

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
