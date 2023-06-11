/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PanelStateInterface from "@everyworkflow/panel-bundle/model/panel-state-interface";

export const ACTION_SET_IS_MOBILE = 'is_mobile';
export const ACTION_SET_PAGE_TITLE = 'set_page_title';
export const ACTION_SET_AUTH = 'set_auth';

export const ACTION_SET_SCREENS = 'set_screens';

export const ACTION_SET_THEME = 'set_theme';
export const ACTION_SET_THEME_TOKEN = 'set_theme_token';

export const ACTION_SET_PANEL_STATE = 'set_panel_state';

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
        case ACTION_SET_SCREENS: {
            return {
                ...state,
                screens: action.payload,
            };
        }
        case ACTION_SET_THEME: {
            return {
                ...state,
                theme: action.payload,
            };
        }
        case ACTION_SET_THEME_TOKEN: {
            return {
                ...state,
                theme_token: action.payload,
            };
        }
        case ACTION_SET_PANEL_STATE: {
            return {
                ...state,
                ...action.payload,
            };
        }

        default:
            return state;
    }
};

export default PanelReducer;
