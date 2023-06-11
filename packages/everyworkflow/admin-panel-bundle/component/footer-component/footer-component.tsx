/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Row, Col, Typography } from 'antd';
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const FooterComponent = () => {
    const projectName: string = PanelConfig.PROJECT_NAME ?? 'EveryWorkflow';

    return (
        <div className="app-container app-panel-footer">
            <Row>
                <Col sm={24} md={12}>
                    <Typography.Paragraph>
                        Copyright © {projectName}. All rights reserved. <br />
                        <small>
                            Powered by:{' '}
                            <a
                                rel="noreferrer"
                                href="https://everyworkflow.com/"
                                target="_blank">
                                EveryWorkflow
                            </a>
                        </small>
                    </Typography.Paragraph>
                </Col>
                <Col sm={24} md={12} style={{ textAlign: 'right' }}>
                    <Typography.Paragraph>
                        <strong>v0.1.0-alpha</strong> <br />
                        <small>
                            <a
                                rel="noreferrer"
                                href="https://everyworkflow.com/report/"
                                target="_blank">
                                Report an issue?
                            </a>
                        </small>
                    </Typography.Paragraph>
                </Col>
            </Row>
        </div>
    );
};

export default FooterComponent;
