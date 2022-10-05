/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import { DataFormFieldMaps } from "@everyworkflow/data-form-bundle/Root/DataFormFieldMaps";
import BaseFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface';
import FormContext from '@everyworkflow/data-form-bundle/Context/FormContext';
import UpdateFormAction from '@everyworkflow/data-form-bundle/Action/UpdateFormAction';
import { FORM_TYPE_INLINE } from '@everyworkflow/data-form-bundle/Component/DataFormComponent/DataFormComponent';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { ACTION_SET_FORM_UPDATE_DATA, ACTION_SET_STATE_DATA } from '@everyworkflow/data-form-bundle/Reducer/FormReducer';

interface RenderFieldProps {
    fields: Array<BaseFieldInterface>;
}

const FieldRenderComponent = ({ fields = [] }: RenderFieldProps) => {
    const { state: formState, dispatch: formDispatch } = useContext(FormContext);

    useEffect(() => {
        fields.forEach((field) => {
            if (field.is_actionable && field.name) {
                fieldActionHandler(field, formState.initial_values[field.name]);
            }
        });
    }, [fields]);

    const fieldActionHandler = (field: BaseFieldInterface, value: any, actionType = 'init') => {
        const actions: Array<any> = field.field_actions[value] ?? [];

        let hiddenFieldNames = formState.hidden_field_names ?? [];
        let disableFieldNames = formState.disable_field_names ?? [];
        let invisibleFieldNames = formState.invisible_field_names ?? [];
        actions.forEach((action: any) => {
            switch (action.action_type) {
                case 'show_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (hiddenFieldNames.includes(fieldName)) {
                            hiddenFieldNames = hiddenFieldNames.filter((item: string) => item !== fieldName);
                        }
                    });
                    break;
                }
                case 'hide_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (!hiddenFieldNames.includes(fieldName)) {
                            hiddenFieldNames.push(fieldName);
                        }
                    });
                    break;
                }
                case 'enable_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (disableFieldNames.includes(fieldName)) {
                            disableFieldNames = disableFieldNames.filter((item: string) => item !== fieldName);
                        }
                    });
                    break;
                }
                case 'disable_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (!disableFieldNames.includes(fieldName)) {
                            disableFieldNames.push(fieldName);
                        }
                    });
                    break;
                }
                case 'add_invisible_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (!invisibleFieldNames.includes(fieldName)) {
                            invisibleFieldNames.push(fieldName);
                        }
                    });
                    break;
                }
                case 'remove_invisible_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        if (invisibleFieldNames.includes(fieldName)) {
                            invisibleFieldNames = invisibleFieldNames.filter((item: string) => item !== fieldName);
                        }
                    });
                    break;
                }
                case 'update_form': {
                    if (field.name && (!Object.keys(formState.form_update_data).includes(field.name) || actionType === 'change')) {
                        const formUpdateData: any = formState.form_update_data ?? {};
                        if (formUpdateData.hasOwnProperty(field.name) && formUpdateData[field.name] === value) {
                            break;
                        }
                        formUpdateData[field.name] = value;
                        formDispatch({
                            type: ACTION_SET_FORM_UPDATE_DATA,
                            payload: formUpdateData,
                        });
                        if (formState.form_data && formState.form_data.form_update_path) {
                            UpdateFormAction(formState.form_data.form_update_path, formUpdateData)(formDispatch);
                        }
                    }
                    break;
                }
            }
        });

        formDispatch({
            type: ACTION_SET_STATE_DATA,
            payload: {
                hidden_field_names: hiddenFieldNames,
                disable_field_names: disableFieldNames,
                invisibleFieldNames: invisibleFieldNames,
            }
        });
    }

    const onValueChange = (field: BaseFieldInterface, value: any) => {
        if (field.is_actionable) {
            fieldActionHandler(field, value, 'change');
        }
    }

    const getSortedFieldData = (formFields: Array<any>): Array<any> => {
        return formFields?.sort((a: any, b: any) => {
            if (a.sort_order > b.sort_order) return 1;
            if (a.sort_order < b.sort_order) return -1;
            return 0;
        });
    };

    const renderField = (item: any, index: number) => {
        if (item.name && !!formState.form_field_maps[item.name]) {
            const DynamicComponent = formState.form_field_maps[item.name];
            return <DynamicComponent key={index} fieldData={item} onChange={(value: any) => {
                onValueChange(item, value);
            }} />;
        }
        if (item.field_type && !!DataFormFieldMaps[item.field_type]) {
            const DynamicComponent = DataFormFieldMaps[item.field_type];
            return <DynamicComponent key={index} fieldData={item} onChange={(value: any) => {
                onValueChange(item, value);
            }} />;
        }

        return (
            <p key={index} style={{ padding: 16 }}>
                Field not found &quot;{item.field_type}&quot;
            </p>
        );
    }

    if (fields.length) {
        return (
            <>
                {formState.form_type === FORM_TYPE_INLINE ? (
                    <Row>
                        {getSortedFieldData([...fields]).map((item: any, index: number) => {
                            return (
                                <Col key={index} className="gutter-row" span={8}>
                                    {renderField(item, index)}
                                </Col>
                            );
                        })}
                    </Row>
                ) : getSortedFieldData([...fields]).map(renderField)}
            </>
        )
    }

    return null;
};

export default FieldRenderComponent;
