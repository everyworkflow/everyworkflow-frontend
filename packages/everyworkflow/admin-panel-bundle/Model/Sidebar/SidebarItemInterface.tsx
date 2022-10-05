/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface SidebarItemInterface {
    item_icon?: string;
    svg?: string;
    item_label?: string;
    item_path?: string;
    showBack?: boolean;
    children?: [SidebarItemInterface];
}

export default SidebarItemInterface;
