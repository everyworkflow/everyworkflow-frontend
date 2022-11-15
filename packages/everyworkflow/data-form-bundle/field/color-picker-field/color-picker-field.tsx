/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useState, useCallback } from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Popover from 'antd/lib/popover';
import { ColorResult, SketchPicker } from 'react-color';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import ColorPickerFieldInterface from '@everyworkflow/data-form-bundle/model/field/color-picker-field-interface';
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';

interface ColorPickerFieldProps extends DynamicFieldPropsInterface {
    fieldData: ColorPickerFieldInterface;
}

const ColorPickerField = ({ fieldData, onChange, children }: ColorPickerFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState<any>({ hex: (fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : '#ffffff' });

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    const handleChange = (color: ColorResult) => {
        if (fieldData.is_disabled) {
            return;
        }
        setColor(color);

        const updateValues: any = {};
        if (fieldData.name && color.hex) {
            updateValues[fieldData.name] = color.hex;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }

        if (onChange && color.hex) {
            onChange(color.hex);
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
                <Space>
                    <Popover
                        trigger="click"
                        open={isOpen}
                        onOpenChange={handleOpenChange}
                        overlayInnerStyle={{
                            margin: '-12px -16px',
                            background: 'transparent',
                            boxShadow: 'none',
                        }}
                        content={<SketchPicker color={color} onChange={handleChange} />}>
                        <Button
                            disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}
                            style={{ backgroundColor: color.hex, width: 32, height: 32 }}>
                            &#160;
                        </Button>
                    </Popover>
                    <span>{color.hex}</span>
                </Space>
            </Form.Item>
            {children}
        </>
    );
};

export default ColorPickerField;
