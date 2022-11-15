/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import FormStateInterface from '@everyworkflow/data-form-bundle/model/form-state-interface';

export const ACTION_SET_STATE_DATA = 'set_state_data';

export const ACTION_SET_FORM_DATA = 'set_form_data';

export const ACTION_SET_FORM_UPDATE_DATA = 'set_form_update_data';

export const ACTION_SET_HIDDEN_FIELD_NAMES = 'set_hidden_field_names';
export const ACTION_SET_INVISIBLE_FIELD_NAMES = 'set_invisible_field_names';
export const ACTION_SET_DISABLE_FIELD_NAMES = 'set_disable_field_names';

const FormReducer = (state: FormStateInterface, action: any) => {
    switch (action.type) {
        case ACTION_SET_STATE_DATA: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case ACTION_SET_FORM_DATA: {
            return {
                ...state,
                form_data: action.payload,
            };
        }
        case ACTION_SET_FORM_UPDATE_DATA: {
            return {
                ...state,
                form_update_data: action.payload,
            };
        }
        case ACTION_SET_HIDDEN_FIELD_NAMES: {
            return {
                ...state,
                hidden_field_names: action.payload,
            };
        }
        case ACTION_SET_INVISIBLE_FIELD_NAMES: {
            return {
                ...state,
                invisible_field_names: action.payload,
            };
        }
        case ACTION_SET_DISABLE_FIELD_NAMES: {
            return {
                ...state,
                disable_field_names: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default FormReducer;
