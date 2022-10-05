/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useState, useCallback, useMemo, useContext } from 'react';
import Form from 'antd/lib/form';
import TextareaFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/TextareaFieldInterface';
import MediaPanelComponent from "@everyworkflow/media-manager-bundle/Component/MediaPanelComponent";
import { MEDIA_MANAGER_TYPE_SINGLE_SELECT } from "@everyworkflow/media-manager-bundle/Component/MediaManagerComponent/MediaManagerComponent";
import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/Model/SelectedMediaItemInterface";
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/Model/DynamicFieldPropsInterface";
import { SimpleMdeReact } from "react-simplemde-editor";
import SimpleMDE from "easymde";
import '@everyworkflow/data-form-bundle/Field/MarkdownField/MarkdownStyle.less';
import "easymde/dist/easymde.min.css";
import UrlHelper from '@everyworkflow/panel-bundle/Helper/UrlHelper';
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';

interface MarkdownFieldProps extends DynamicFieldPropsInterface {
    fieldData: TextareaFieldInterface;
}

const MarkdownField = ({ fieldData, onChange, children }: MarkdownFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [simpleMdeInstance, setSimpleMdeInstance] = useState<SimpleMDE | undefined>(undefined);
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);

    const getErrorMessage = useCallback(() => {
        if (formState.form_errors && fieldData.name && formState.form_errors[fieldData.name] &&
            formState.form_errors[fieldData.name].errors && formState.form_errors[fieldData.name].errors[0]) {
            return formState.form_errors[fieldData.name].errors[0].toString();
        }
        return undefined;
    }, [fieldData, formState.form_errors]);
    
    const getMdeInstanceCallback = useCallback((simpleMde: SimpleMDE) => {
        setSimpleMdeInstance(simpleMde);
    }, [setSimpleMdeInstance]);

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

    const anOptions = useMemo(() => {
        return {
            toolbar: [
                'bold',
                'italic',
                'strikethrough',
                'heading',
                '|',
                'code',
                'quote',
                'unordered-list',
                'ordered-list',
                'clean-block',
                '|',
                'link',
                'table',
                'horizontal-rule',
                {
                    name: "media_image_selector",
                    action: () => {
                        setIsMediaSelectorEnabled(true);
                    },
                    className: "fa fa-image",
                    title: "Media image selector",
                },
                '|',
                'preview',
                'side-by-side',
                'fullscreen',
                '|',
                'guide',
                'undo',
                'redo'
            ],
            maxHeight: '500px',
            spellChecker: false,
        } as SimpleMDE.Options;
    }, [setIsMediaSelectorEnabled]);

    const onMediaImageSelected = (items: Array<SelectedMediaItemInterface>) => {
        if (items.length) {
            const imageMdText = '![' + items[0].title + '](' + UrlHelper.buildImgUrlFromPath(items[0].path_name) + ')';
            simpleMdeInstance?.codemirror.replaceSelection(imageMdText);
        }
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
                validateStatus={getErrorMessage() ? 'error' : undefined}
                help={getErrorMessage()}
                rules={[{ required: fieldData.is_required }]}>
                <SimpleMdeReact
                    getMdeInstance={getMdeInstanceCallback}
                    onChange={handleChange}
                    options={anOptions}
                />
            </Form.Item>
            {isMediaSelectorEnabled && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_SINGLE_SELECT}
                    onSelectedDataChange={onMediaImageSelected}
                    onClose={() => {
                        setIsMediaSelectorEnabled(false);
                    }}
                />
            )}
            {children}
        </>
    );
};

export default MarkdownField;
