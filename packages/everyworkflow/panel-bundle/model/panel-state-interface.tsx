/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface PanelStateInterface {
    is_mobile: boolean;
    page_title?: string;
    auth?: any;
    screens?: any;
    theme: string;
    theme_token?: any;
}

export default PanelStateInterface;
