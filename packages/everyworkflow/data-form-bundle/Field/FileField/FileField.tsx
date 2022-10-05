/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useCallback } from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Upload from 'antd/lib/upload';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import FileFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/FileFieldInterface';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/Model/DynamicFieldPropsInterface";
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';

interface FileFieldProps extends DynamicFieldPropsInterface {
    fieldData: FileFieldInterface;
}

const FileField = ({ fieldData, children }: FileFieldProps) => {
    const { state: formState } = useContext(FormContext);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

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
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                extra={fieldData.help_text}>
                <Upload name="logo" action="/upload.do" listType="picture"
                    disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            {children}
        </>
    );
};

export default FileField;
