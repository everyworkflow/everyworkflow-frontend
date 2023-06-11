/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState } from 'react';
import Remote from "@everyworkflow/panel-bundle/service/remote";
import DataFormComponent from "@everyworkflow/data-form-bundle/component/data-form-component";
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "@everyworkflow/panel-bundle/action/alert-action";
import { FORM_TYPE_HORIZONTAL } from "@everyworkflow/data-form-bundle/component/data-form-component/data-form-component";
import ValidationError from '@everyworkflow/panel-bundle/error/validation-error';

interface SettingFormProps {
    code: string,
    form: any,
    remoteData: any,
}

const SettingForm = ({ code, form, remoteData }: SettingFormProps) => {
    const [formErrors, setFormErrors] = useState<any>();

    const onSubmit = async (data: any) => {
        const submitData: any = {};
        Object.keys(data).forEach(name => {
            if (data[name] !== undefined) {
                submitData[name] = data[name];
            }
        });

        const handlePostResponse = (response: any) => {
            AlertAction({
                description: response.detail,
                message: 'Form submit success',
                type: ALERT_TYPE_SUCCESS,
            });
        };

        try {
            const currentSettingCode = code ?? 'general-setting';
            const response = await Remote.post('/setting/' + currentSettingCode, submitData);
            handlePostResponse(response);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                setFormErrors(error.errors);
            }

            AlertAction({
                description: error.detail,
                message: 'Submit error',
                type: ALERT_TYPE_ERROR,
            });
        }
    };

    return (
        <DataFormComponent
            form={form}
            initialValues={remoteData.item}
            formErrors={formErrors}
            formData={remoteData.data_form}
            formType={FORM_TYPE_HORIZONTAL}
            onSubmit={onSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
        />
    );
};

export default SettingForm;
