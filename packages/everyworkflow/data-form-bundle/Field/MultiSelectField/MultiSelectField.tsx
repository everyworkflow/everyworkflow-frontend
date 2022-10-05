/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import SelectFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/SelectFieldInterface';
import OptionInterface from '@everyworkflow/data-form-bundle/Model/Field/Select/OptionInterface';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/Model/DynamicFieldPropsInterface";
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';

interface MultiSelectFieldProps extends DynamicFieldPropsInterface {
    fieldData: SelectFieldInterface;
}

const MultiSelectField = ({ fieldData, onChange, children }: MultiSelectFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const onSearch = (val: string) => {
        console.log('search:', val);
    };

    const handleChange = (value: string) => {
        if (onChange) {
            onChange(value);
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
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : undefined}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <Select
                    mode="multiple"
                    showSearch={fieldData.is_searchable}
                    optionFilterProp="children"
                    onChange={handleChange}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                    allowClear={fieldData.allow_clear ?? false}
                    onSearch={fieldData.is_searchable ? onSearch : undefined}
                // filterOption={(input, option) =>
                //     option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                >
                    {fieldData.options?.map(
                        (option: OptionInterface, index: number) => (
                            <Select.Option key={index} value={option.key}>
                                {option.value}
                            </Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
            {children}
        </>
    );
};

export default MultiSelectField;
