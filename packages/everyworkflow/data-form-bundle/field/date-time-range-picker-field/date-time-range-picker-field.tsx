/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';
import DateTimeRangePickerFieldInterface
    from "@everyworkflow/data-form-bundle/model/field/date-time-range-picker-field-interface";
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';

interface DateTimeRangePickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: DateTimeRangePickerFieldInterface;
}

const DateTimeRangePickerField = ({ fieldData, onChange, children }: DateTimeRangePickerFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (_: any, dateString: [string, string]) => {
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
                        if (formState.initial_values[fieldData.name].length === 2) {
                            return [
                                moment(formState.initial_values[fieldData.name][0]),
                                moment(formState.initial_values[fieldData.name][1]),
                            ];
                        }
                    }
                    return undefined;
                })()}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <DatePicker.RangePicker
                    allowClear={fieldData.allow_clear ?? false}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                    showTime={{
                        format: 'HH:mm:ss',
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                    }}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default DateTimeRangePickerField;
