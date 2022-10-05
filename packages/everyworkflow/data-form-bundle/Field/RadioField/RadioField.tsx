/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useState, useCallback } from 'react';
import Form from 'antd/lib/form';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import RadioFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/RadioFieldInterface';
import OptionInterface from '@everyworkflow/data-form-bundle/Model/Field/Select/OptionInterface';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/Model/DynamicFieldPropsInterface";
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';

interface RadioFieldProps extends DynamicFieldPropsInterface {
    fieldData: RadioFieldInterface;
}

const RadioField = ({ fieldData, onChange, children }: RadioFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [value, setValue] = useState((fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : '');

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
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
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : ''}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <Radio.Group
                    value={value}
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}>
                    {fieldData.options?.map(
                        (option: OptionInterface, index: number) => (
                            <Radio key={index} value={option.key}>
                                {option.value}
                            </Radio>
                        )
                    )}
                </Radio.Group>
            </Form.Item>
            {children}
        </>
    );
};

export default RadioField;
