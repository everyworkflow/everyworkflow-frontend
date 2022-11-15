/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AdminPanelStateInterface from "@everyworkflow/admin-panel-bundle/model/admin-panel-state-interface";

export const ACTION_SET_BACKDROP = 'set_backdrop';

export const ACTION_SHOW_MOBILE_APP_SIDEBAR = 'show_mobile_app_sidebar';
export const ACTION_HIDE_MOBILE_APP_SIDEBAR = 'hide_mobile_app_sidebar';

export const ACTION_HIDE_FOOTER = 'hide_footer';
export const ACTION_SHOW_FOOTER = 'show_footer';

export const ACTION_SET_SIDEBAR_DATA = 'set_sidebar_data';

interface AdminPanelActionInterface {
    type: string;
    payload: any;
}

const AdminPanelReducer = (
    state: AdminPanelStateInterface,
    action: AdminPanelActionInterface
) => {
    switch (action.type) {
        case ACTION_SET_BACKDROP: {
            return {
                ...state,
                backdrop: action.payload,
            };
        }
        case ACTION_HIDE_FOOTER: {
            return {
                ...state,
                hide_footer: true,
            };
        }
        case ACTION_SHOW_FOOTER: {
            return {
                ...state,
                hide_footer: false,
            };
        }
        case ACTION_SET_SIDEBAR_DATA: {
            return {
                ...state,
                sidebar_data: action.payload,
            };
        }
        case ACTION_SHOW_MOBILE_APP_SIDEBAR: {
            return {
                ...state,
                show_mobile_app_sidebar: true,
            };
        }
        case ACTION_HIDE_MOBILE_APP_SIDEBAR: {
            return {
                ...state,
                show_mobile_app_sidebar: false,
            };
        }
        default:
            return state;
    }
};

export default AdminPanelReducer;
