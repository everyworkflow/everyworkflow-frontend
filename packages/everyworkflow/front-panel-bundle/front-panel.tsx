/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import FrontPanelRoot from "@everyworkflow/front-panel-bundle/front-panel-root";
import RootPanelComponent from '@everyworkflow/panel-bundle/component/root-panel-component';
import '@everyworkflow/front-panel-bundle/style.css';

const FrontPanel = () => {
    return (
        <RootPanelComponent>
            <FrontPanelRoot />
        </RootPanelComponent>
    );
}

export default FrontPanel;
