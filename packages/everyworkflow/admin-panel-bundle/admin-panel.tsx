/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AdminPanelRoot from '@everyworkflow/admin-panel-bundle/admin-panel-root';
import RootPanelComponent from '@everyworkflow/panel-bundle/component/root-panel-component';
import '@everyworkflow/admin-panel-bundle/style.css';

const AdminPanel = () => {
    return (
        <RootPanelComponent>
            <AdminPanelRoot />
        </RootPanelComponent>
    );
}

export default AdminPanel;
