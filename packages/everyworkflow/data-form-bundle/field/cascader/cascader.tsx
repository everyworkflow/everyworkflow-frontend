/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback } from 'react';
import { Form, Cascader } from 'antd';
import DynamicFieldPropsInterface from '@everyworkflow/data-form-bundle/model/dynamic-field-props-interface';
import CascaderFieldInterface from '@everyworkflow/data-form-bundle/model/field/cascader-field-interface';
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';
import { FORM_MODE_VIEW } from '@everyworkflow/data-form-bundle/component/data-form-component/data-form-component';

interface CascaderFieldProps extends DynamicFieldPropsInterface {
    fieldData: CascaderFieldInterface;
}

const CascaderField = ({
    fieldData,
    onChange,
    children,
}: CascaderFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    if (formState.mode === FORM_MODE_VIEW) {
        return <span>{fieldData?.value}</span>;
    }

    const filter = (inputValue: any, path: any) => {
        return path.some(
            (option: any) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );
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
                rules={[{ required: fieldData.is_required }]}>
                <Cascader
                    // options={fieldData.options}
                    onChange={onChange}
                    placeholder="Please select"
                    showSearch={{ filter }}
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                />
            </Form.Item>
            {children}
        </>
    );
};

export default CascaderField;
