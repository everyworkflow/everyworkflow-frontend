/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PanelStateInterface from "@everyworkflow/panel-bundle/Model/PanelStateInterface";

export const ACTION_SET_IS_MOBILE = 'is_mobile';
export const ACTION_SET_PAGE_TITLE = 'set_page_title';
export const ACTION_SET_AUTH = 'set_auth';

interface PanelActionInterface {
    type: string;
    payload: any;
}

const PanelReducer = (
    state: PanelStateInterface,
    action: PanelActionInterface
) => {
    switch (action.type) {
        case ACTION_SET_IS_MOBILE: {
            return {
                ...state,
                is_mobile: action.payload,
            };
        }
        case ACTION_SET_PAGE_TITLE: {
            return {
                ...state,
                page_title: action.payload,
            };
        }
        case ACTION_SET_AUTH: {
            return {
                ...state,
                auth: action.payload,
            };
        }
        default:
            return state;
    }
};

export default PanelReducer;
