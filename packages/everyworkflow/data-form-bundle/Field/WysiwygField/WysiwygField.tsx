/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useState, useCallback, useMemo, useContext, useRef } from 'react';
import Form from 'antd/lib/form';
import TextareaFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/TextareaFieldInterface';
import MediaPanelComponent from "@everyworkflow/media-manager-bundle/Component/MediaPanelComponent";
import { MEDIA_MANAGER_TYPE_SINGLE_SELECT } from "@everyworkflow/media-manager-bundle/Component/MediaManagerComponent/MediaManagerComponent";
import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/Model/SelectedMediaItemInterface";
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/Model/DynamicFieldPropsInterface";
import '@everyworkflow/data-form-bundle/Field/WysiwygField/WysiwygFieldStyle.less';
import UrlHelper from '@everyworkflow/panel-bundle/Helper/UrlHelper';
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';
import { Editor } from '@tinymce/tinymce-react';
import Input from 'antd/lib/input';

interface WysiwygFieldProps extends DynamicFieldPropsInterface {
    fieldData: TextareaFieldInterface;
}

const WysiwygField = ({ fieldData, onChange, children }: WysiwygFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);
    const editorRef = useRef<any>(null);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);

    const handleChange = (value: string) => {
        const updateValues: any = {};
        if (fieldData.name) {
            updateValues[fieldData.name] = value;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
        if (onChange) {
            onChange(value);
        }
    };

    const onMediaImageSelected = (items: Array<SelectedMediaItemInterface>) => {
        if (items.length) {
            const image = '<img src="' + UrlHelper.buildImgUrlFromPath(items[0].path_name) + '" alt="' + items[0].title + '" />';
            editorRef.current?.insertContent(image);
        }
    }

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <>
            <Form.Item
                style={{
                    // display: 'none',
                }}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.name && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : undefined}
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <>
                    <Input.TextArea style={{ display: 'none' }} />
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'media_image_selector | ' +
                                'removeformat code fullscreen | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            setup: function (editor) {
                                editor.ui.registry.addButton('media_image_selector', {
                                    tooltip: 'Media image selector',
                                    icon: 'image',
                                    onAction: function () {
                                        setIsMediaSelectorEnabled(true);
                                    }
                                });
                            }
                        }}
                        onEditorChange={(a, editor) => {
                            handleChange(a);
                        }}
                    />
                </>
            </Form.Item>
            {isMediaSelectorEnabled && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_SINGLE_SELECT}
                    onSelectedDataChange={onMediaImageSelected}
                    style={{ zIndex: 1200 }}
                    onClose={() => {
                        setIsMediaSelectorEnabled(false);
                    }}
                />
            )}
            {children}
        </>
    );
};

export default WysiwygField;
