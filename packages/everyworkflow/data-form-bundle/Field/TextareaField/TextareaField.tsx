/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import TextareaFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/TextareaFieldInterface';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/Model/DynamicFieldPropsInterface";
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';
import { FORM_MODE_VIEW } from '@everyworkflow/data-form-bundle/Component/DataFormComponent/DataFormComponent';

interface TextareaFieldProps extends DynamicFieldPropsInterface {
    fieldData: TextareaFieldInterface;
}

const TextareaField = ({fieldData, onChange, children}: TextareaFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    if (formState.mode === FORM_MODE_VIEW) {
        return <div>{fieldData?.value}</div>;
    }

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
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ?? ''}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{required: fieldData.is_required}]}>
                <Input.TextArea
                    onChange={handleChange}
                    rows={fieldData.row_count}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default TextareaField;
