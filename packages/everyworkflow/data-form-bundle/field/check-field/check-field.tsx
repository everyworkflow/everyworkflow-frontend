/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useState, useCallback } from 'react';
import Form from 'antd/lib/form';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CheckFieldInterface from '@everyworkflow/data-form-bundle/model/field/check-field-interface';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';

interface CheckFieldProps extends DynamicFieldPropsInterface {
    fieldData: CheckFieldInterface;
}

const CheckField = ({ fieldData, onChange, children }: CheckFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [checkboxStatus, setCheckboxStatus] = useState(!!fieldData.value);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (event: CheckboxChangeEvent) => {
        const updateValues: any = {};
        if (fieldData.name) {
            updateValues[fieldData.name] = event.target.checked;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
        setCheckboxStatus(event.target.checked);
        if (onChange) {
            onChange(event.target.checked);
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
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
            >
                <Checkbox
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                    checked={checkboxStatus}>
                    {fieldData.help_text}
                </Checkbox>
            </Form.Item>
            {children}
        </>
    );
};

export default CheckField;
