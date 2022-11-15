/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SidebarItemInterface from "@everyworkflow/admin-panel-bundle/model/sidebar/sidebar-item-interface";

interface AdminPanelStateInterface {
    show_mobile_app_sidebar: boolean;
    hide_footer: boolean;
    sidebar_data?: [SidebarItemInterface];
}

export default AdminPanelStateInterface;
