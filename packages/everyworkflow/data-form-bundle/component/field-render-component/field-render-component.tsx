/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { Row, Col } from 'antd';
import { DataFormFieldMaps } from "@everyworkflow/data-form-bundle/root/data-form-field-maps";
import BaseFieldInterface from '@everyworkflow/data-form-bundle/model/field/base-field-interface';
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';
import UpdateFormAction from '@everyworkflow/data-form-bundle/action/update-form-action';
import { FORM_TYPE_INLINE } from '@everyworkflow/data-form-bundle/component/data-form-component/data-form-component';
import {
    ACTION_ADD_DISABLE_FIELD_NAMES,
    ACTION_ADD_HIDDEN_FIELD_NAMES,
    ACTION_ADD_INVISIBLE_FIELD_NAMES,
    ACTION_REMOVE_DISABLE_FIELD_NAMES,
    ACTION_REMOVE_HIDDEN_FIELD_NAMES,
    ACTION_REMOVE_INVISIBLE_FIELD_NAMES,
    ACTION_SET_FORM_UPDATE_DATA
} from '@everyworkflow/data-form-bundle/reducer/form-reducer';

interface RenderFieldProps {
    fields: Array<BaseFieldInterface>;
}

const FieldRenderComponent = ({ fields = [] }: RenderFieldProps) => {
    const { state: formState, dispatch: formDispatch } = useContext(FormContext);

    useEffect(() => {
        fields.forEach((field) => {
            if (field.is_actionable && field.name) {
                fieldActionHandler(field, formState.initial_values[field.name], 'init');
            }
        });
    }, [fields]);

    const fieldActionHandler = (field: BaseFieldInterface, value: any, actionType = 'init') => {
        if (actionType === 'init' && value === undefined && field.hasOwnProperty('default_value')) {
            value = field?.default_value;
        }
        if (typeof value === 'boolean') {
            value = Number(value);
        }
        const actions: Array<any> = field.field_actions[value] ?? [];

        actions.forEach((action: any) => {
            switch (action.action_type) {
                case 'show_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        formDispatch({
                            type: ACTION_REMOVE_HIDDEN_FIELD_NAMES,
                            payload: fieldName,
                        });
                    });
                    break;
                }
                case 'hide_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        formDispatch({
                            type: ACTION_ADD_HIDDEN_FIELD_NAMES,
                            payload: fieldName,
                        });
                    });
                    break;
                }
                case 'enable_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        formDispatch({
                            type: ACTION_REMOVE_DISABLE_FIELD_NAMES,
                            payload: fieldName,
                        });
                    });
                    break;
                }
                case 'disable_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        formDispatch({
                            type: ACTION_ADD_DISABLE_FIELD_NAMES,
                            payload: fieldName,
                        });
                    });
                    break;
                }
                case 'add_invisible_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        formDispatch({
                            type: ACTION_ADD_INVISIBLE_FIELD_NAMES,
                            payload: fieldName,
                        });
                    });
                    break;
                }
                case 'remove_invisible_field': {
                    action.field_names?.forEach((fieldName: string) => {
                        formDispatch({
                            type: ACTION_REMOVE_INVISIBLE_FIELD_NAMES,
                            payload: fieldName,
                        });
                    });
                    break;
                }
                case 'update_form': {
                    if (field.name && (actionType === 'change' || actionType === 'init')) {
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
