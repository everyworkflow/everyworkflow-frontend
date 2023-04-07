/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Button, Space } from 'antd';
import ThemeSwitcherComponent from '@everyworkflow/store-panel-bundle/component/theme-switcher-component';

const HeaderTopComponent = () => {
    return (
        <div className="app-header-top">
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Space>
                    <div>
                        Phone: <a href="tel:9800000000"><Button type="text" size="small">9800000000</Button></a>
                    </div>
                    <div>
                        Email: <a href="mailto:contact@example.com"><Button type="text" size="small">contact@example.com</Button></a>
                    </div>
                </Space>
                <Space>
                    <div>
                        <ThemeSwitcherComponent />
                    </div>
                </Space>
            </div>
        </div>
    );
}

export default HeaderTopComponent;
