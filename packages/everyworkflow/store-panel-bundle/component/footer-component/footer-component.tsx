/*
 * @copyright EveryWorkflow. All rights reserved.
 */

'use client';

import { theme } from 'antd';
import FooterBottomComponent from '@everyworkflow/store-panel-bundle/component/footer-bottom-component';

const FooterComponent = () => {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                paddingTop: token.padding * 2,
                paddingBottom: token.padding * 2,
                paddingLeft: token.padding,
                paddingRight: token.padding,
            }}>
            <FooterBottomComponent />
        </div>
    );
}

export default FooterComponent;
