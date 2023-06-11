/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Layout, Typography } from "antd";
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const FooterComponent = () => {
    const projectName: string = PanelConfig.PROJECT_NAME ?? 'EveryWorkflow';

    return (
        <Layout.Footer style={{ textAlign: 'center' }}>
            <Typography.Paragraph>Copyright © {projectName}. All rights reserved.</Typography.Paragraph>
        </Layout.Footer>
    );
}

export default FooterComponent;
