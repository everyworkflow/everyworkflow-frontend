/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/model/page-builder-state-interface";

export const ACTION_SET_PAGE_BUILDER_STATE = 'set_page_builder_state';
export const ACTION_SET_BLOCK_DATA = 'set_block_data';
export const ACTION_ADD_BLOCK_FORM_DATA = 'add_block_form_data';
export const ACTION_SET_BLOCK_DRAGGING = 'set_block_dragging';

const PageBuilderReducer = (state: PageBuilderStateInterface, action: any) => {
    switch (action.type) {
        case ACTION_SET_PAGE_BUILDER_STATE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case ACTION_SET_BLOCK_DATA: {
            return {
                ...state,
                block_data: action.payload,
            };
        }
        case ACTION_ADD_BLOCK_FORM_DATA: {
            const blocKFormData = state.block_form_data ?? [];
            const currentIndex = blocKFormData.findIndex(item => item.block_type === action.payload.block_type);
            if (currentIndex >= 0) {
                blocKFormData[currentIndex] = { ...blocKFormData[currentIndex], ...action.payload };
            } else {
                blocKFormData.push(action.payload);
            }
            return {
                ...state,
                block_form_data: blocKFormData,
            };
        }
        case ACTION_SET_BLOCK_DRAGGING: {
            return {
                ...state,
                block_dragging: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export default PageBuilderReducer;
