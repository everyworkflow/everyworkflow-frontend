/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback } from 'react';
import Form from 'antd/lib/form';
import DatePicker from 'antd/lib/date-picker';
import Input from "antd/lib/input";
import moment from 'moment';
import DateTimePickerFieldInterface from "@everyworkflow/data-form-bundle/model/field/date-time-picker-field-interface";
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';

interface DateTimePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: DateTimePickerFieldInterface;
}

const DateTimePickerField = ({ fieldData, onChange, children }: DateTimePickerFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (value: any, dateString: string) => {
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
                initialValue={(() => {
                    if (fieldData.name && formState.initial_values[fieldData.name]) {
                        if (fieldData.is_readonly) {
                            return formState.initial_values[fieldData.name];
                        }
                        return moment(formState.initial_values[fieldData.name]);
                    }
                    return undefined;
                })()}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                {fieldData.is_readonly ? (
                    <Input
                        disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                        bordered={!fieldData.is_readonly}
                        readOnly={fieldData.is_readonly}
                    />
                ) : (
                    <DatePicker
                        showTime={{ format: 'HH:mm:ss' }}
                        allowClear={fieldData.allow_clear ?? false}
                        onChange={handleChange}
                        disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                    />
                )}
            </Form.Item>
            {children}
        </>
    );
};

export default DateTimePickerField;
