/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState, useCallback, useContext, useRef } from 'react';
import { Form, Input } from 'antd';
import TextareaFieldInterface from '@everyworkflow/data-form-bundle/model/field/textarea-field-interface';
import MediaPanelComponent from "@everyworkflow/media-manager-bundle/component/media-panel-component";
import { MEDIA_MANAGER_TYPE_SINGLE_SELECT } from "@everyworkflow/media-manager-bundle/component/media-manager-component/media-manager-component";
import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/model/selected-media-item-interface";
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';
import PanelConfig from '@everyworkflow/panel-bundle/config/panel-config';
import { Editor } from '@tinymce/tinymce-react';

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
                        apiKey={PanelConfig.TINY_API_KEY}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'media_image_selector | ' +
                                'removeformat code fullscreen | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            fullscreen_native: true,
                            setup: function(editor) {
                                editor.ui.registry.addButton('media_image_selector', {
                                    tooltip: 'Media image selector',
                                    icon: 'image',
                                    onAction: function() {
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
