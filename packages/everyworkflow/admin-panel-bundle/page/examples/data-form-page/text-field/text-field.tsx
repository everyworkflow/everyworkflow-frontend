/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Form, Input } from 'antd';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import TextFieldInterface from "@everyworkflow/data-form-bundle/model/field/text-field-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';
import { FORM_MODE_VIEW } from '@everyworkflow/data-form-bundle/component/data-form-component/data-form-component';

interface TextFieldProps extends DynamicFieldPropsInterface {
    fieldData: TextFieldInterface;
}

const TextField = ({ fieldData, onChange, children }: TextFieldProps) => {
    const { state: formState } = useContext(FormContext);

    if (formState.mode === FORM_MODE_VIEW) {
        return <span>{fieldData?.value}</span>;
    }

    const getInputType = () => {
        return fieldData.input_type ? fieldData.input_type : 'text';
    };

    const handleChange = (event: any) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <>
            <Form.Item
                name={fieldData.name}
                label={'New Form Field for name only - ' + fieldData.label}
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ?? ''}
                rules={[{ required: fieldData.is_required }]}>
                <Input
                    onChange={handleChange}
                    allowClear={fieldData.allow_clear}
                    addonBefore={fieldData.prefix_tab_text}
                    addonAfter={fieldData.suffix_tab_text}
                    prefix={fieldData.prefix_text}
                    suffix={fieldData.suffix_text}
                    type={(fieldData.is_disabled || fieldData.is_readonly) ? 'text' : getInputType()}
                    disabled={fieldData.is_disabled}
                    bordered={!fieldData.is_readonly}
                    readOnly={fieldData.is_readonly}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default TextField;
