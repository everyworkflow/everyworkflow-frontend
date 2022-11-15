/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import AlertAction, { ALERT_TYPE_ERROR } from "@everyworkflow/panel-bundle/action/alert-action";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import { ACTION_SET_FORM_DATA } from "@everyworkflow/data-form-bundle/reducer/form-reducer";

const UpdateFormAction = (path: string, payload: any) => {
    return async (dispatch: any) => {
        const handleResponse = (response: any) => {
            if (response.data_form) {
                dispatch({
                    type: ACTION_SET_FORM_DATA,
                    payload: response.data_form,
                });
            }
        };

        try {
            const response: any = await Remote.post(path, payload);
            handleResponse(response);
        } catch (error: any) {
            AlertAction({
                description: error.message,
                message: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        }
    };
};

export default UpdateFormAction;

