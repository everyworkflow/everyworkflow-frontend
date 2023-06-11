/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback } from 'react';
import { Form, TimePicker } from 'antd';
import moment from 'moment';
import TimePickerFieldInterface from "@everyworkflow/data-form-bundle/model/field/time-picker-field-interface";
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';

interface TimePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: TimePickerFieldInterface;
}

const TimePickerField = ({ fieldData, onChange, children }: TimePickerFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (_: any, dateString: string) => {
        if (onChange) {
            onChange(dateString);
        }
    };

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <>
            <Form.Item
                style={!!(fieldData.name && formState.invisible_field_names?.includes(fieldData.name)) ? {
                    display: 'none',
                } : undefined}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.name && formState.initial_values && formState.initial_values[fieldData.name]) ? moment(formState.initial_values[fieldData.name], 'HH:mm:ss') : undefined}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <TimePicker
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default TimePickerField;
