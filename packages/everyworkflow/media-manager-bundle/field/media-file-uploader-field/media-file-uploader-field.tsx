/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useState, useEffect, useCallback } from 'react';
import { Form, Button, Image, Input, Upload } from 'antd';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import MediaImageUploaderFieldInterface
    from '@everyworkflow/media-manager-bundle/model/field/media-image-uploader-field-interface';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';
import PanelConfig from '@everyworkflow/panel-bundle/config/panel-config';

interface MediaFileUploaderFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageUploaderFieldInterface;
}

const MediaFileUploaderField = ({ fieldData, children }: MediaFileUploaderFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [selectedMediaPath, setSelectedMediaPath] = useState<string | undefined>(((): string | undefined => {
        if (fieldData.name && formState.initial_values[fieldData.name]) {
            if (formState.initial_values[fieldData.name] === 'string') {
                return formState.initial_values[fieldData.name];
            }
        }
        return undefined;
    })());
    const authPrefixKey: string = PanelConfig.REACT_AUTH_PREFIX_KEY ?? 'ew_';

    useEffect(() => {
        const updateValues: any = {};
        if (fieldData.name && selectedMediaPath) {
            updateValues[fieldData.name] = selectedMediaPath;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
    }, [selectedMediaPath]);

    const isImageSelected = useCallback(() => {
        let isImage = false;
        ['.png', '.jpg', '.jpeg', 'svg'].forEach((extension: string) => {
            if (selectedMediaPath?.endsWith(extension)) {
                isImage = true;
            }
        });
        return isImage;
    }, [selectedMediaPath]);

    const getProps = () => {
        const requestHeader: any = {
            'accept': 'application/json',
        };
        try {
            const authData: any = LocalStorage.get(authPrefixKey + 'auth');
            if (authData.token) {
                requestHeader['Authorization'] = 'Bearer ' + authData.token;
            }
        } catch (error: any) { }

        let props: any = {
            name: 'file',
            showUploadList: false,
            action: UrlHelper.buildApiUrl(fieldData.upload_path ?? ''),
            headers: requestHeader,
            onChange: (info: any) => {
                const { status, response } = info.file;
                if (status === 'done') {
                    if (response.item && response.item.path_name) {
                        setSelectedMediaPath(response.item.path_name);
                        const fieldValues: any = {};
                        if (fieldData.name) {
                            fieldValues[fieldData.name] = response.item.path_name;
                            formState.form?.setFieldsValue(fieldValues);
                        }
                    }
                    AlertAction({
                        message: `${info.file.name} file uploaded successfully.`,
                        type: ALERT_TYPE_SUCCESS
                    });
                } else if (status === 'error') {
                    AlertAction({
                        message: `${info.file.name} file upload failed.`,
                        type: ALERT_TYPE_ERROR
                    });
                }
            },
        };

        return props;
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
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : undefined}
                rules={[{ required: fieldData.is_required }]}>
                <>
                    {selectedMediaPath && (
                        <div style={{ marginBottom: 8 }}>
                            <Input
                                value={selectedMediaPath}
                                disabled={true}
                                readOnly={true}
                            />
                        </div>
                    )}
                    {selectedMediaPath && isImageSelected() && (
                        <div style={{ marginBottom: 8 }}>
                            <Image
                                src={UrlHelper.buildImgUrlFromPath(selectedMediaPath)}
                                style={{ maxWidth: '100%', maxHeight: '600px' }}
                            />
                        </div>
                    )}
                    <Upload {...getProps()}>
                        <Button type="default" icon={<UploadOutlined />}>Upload file</Button>
                    </Upload>
                </>
            </Form.Item>
            {children}
        </>
    );
};

export default MediaFileUploaderField;
