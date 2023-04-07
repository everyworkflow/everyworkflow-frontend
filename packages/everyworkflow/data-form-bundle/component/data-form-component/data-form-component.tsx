/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Suspense, useCallback, useEffect, useReducer } from "react";
import { Form, FormInstance, ColProps } from 'antd';
import { FormLabelAlign } from "antd/lib/form/interface";
import moment from "moment";
import DataFormInterface from "@everyworkflow/data-form-bundle/model/data-form-interface";
import LoadingIndicatorComponent from "@everyworkflow/panel-bundle/component/loading-indicator-component";
import FormContext from "@everyworkflow/data-form-bundle/context/form-context";
import FormReducer, { ACTION_SET_STATE_DATA } from "@everyworkflow/data-form-bundle/reducer/form-reducer";
import { formState } from "@everyworkflow/data-form-bundle/state/form-state";
import DataFormContentComponent from '@everyworkflow/data-form-bundle/component/data-form-content-component';

export const FORM_TYPE_VERTICAL = "vertical"; // default
export const FORM_TYPE_HORIZONTAL = "horizontal";
export const FORM_TYPE_INLINE = "inline";

export const FORM_MODE_EDIT = "mode_edit"; // default
export const FORM_MODE_VIEW = "mode_view";

interface DataFormProps {
    className?: string;
    formId?: string;
    form?: FormInstance;
    formData?: DataFormInterface;
    formType?: "vertical" | "horizontal" | "inline";
    mode?: string;
    method?: string;
    hasMarginBottom?: boolean;
    children?: JSX.Element | JSX.Element[];
    formRef?: any;
    onSubmit?: (data: any) => void;
    labelAlign?: FormLabelAlign;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    initialValues?: any;
    formErrors?: any;
    formSectionMaps?: any;
    formFieldMaps?: any;
    formContent?: JSX.Element | JSX.Element[];
}

const DataFormComponent = ({
    className,
    formId,
    form,
    formData,
    formType = FORM_TYPE_VERTICAL,
    mode,
    children,
    formRef,
    onSubmit,
    labelAlign,
    labelCol,
    wrapperCol,
    initialValues,
    formErrors,
    formSectionMaps,
    formFieldMaps,
    formContent
}: DataFormProps) => {
    const [state, dispatch] = useReducer(FormReducer, {
        ...formState,
        form_data: formData,

        mode: mode,

        form_errors: formErrors ?? {},
        initial_values: initialValues ?? {},
        form_section_maps: formSectionMaps ?? {},
        form_field_maps: formFieldMaps ?? {},
    });
    const [internalForm] = Form.useForm();

    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    useEffect(() => {
        dispatch({
            type: ACTION_SET_STATE_DATA,
            payload: {
                form_data: formData ?? {},
                initial_values: initialValues ?? {},
            }
        });
    }, [formData, initialValues]);

    const getFormId = useCallback(() => {
        if (formId === undefined) {
            return "form-" + Math.random();
        }
        return formId;
    }, [formId]);

    const onFinish = (values: any) => {
        if (onSubmit) {
            Object.keys(values).forEach((key) => {
                if (Array.isArray(values[key])) {
                    const newValues: Array<any> = [];
                    values[key].forEach((item: any, index: number) => {
                        if (item instanceof moment) {
                            // @ts-ignore
                            newValues[index] = item.toISOString();
                        } else {
                            newValues[index] = item;
                        }
                    });
                    values[key] = newValues;
                } else if (values[key] instanceof moment) {
                    values[key] = values[key].toISOString();
                }
            });
            console.log("onFinish --> values", values);
            onSubmit(values);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const getLabelCol = useCallback(() => {
        if (labelCol) {
            return labelCol;
        }
        if (formType === FORM_TYPE_HORIZONTAL) {
            return { span: 6 };
        }
        return undefined;
    }, [labelCol, formType]);

    const getWrapperCol = useCallback(() => {
        if (wrapperCol) {
            return wrapperCol;
        }
        if (formType === FORM_TYPE_HORIZONTAL) {
            return { span: 14 };
        }
        return undefined;
    }, [wrapperCol, formType]);

    return (
        <FormContext.Provider
            value={{
                state: {
                    ...state,
                    form_id: getFormId(),
                    form_type: formType,
                    form: form ?? internalForm,
                },
                dispatch: dispatch,
            }}>
            <Form
                className={className}
                ref={formRef}
                id={getFormId()}
                form={form ?? internalForm}
                labelAlign={labelAlign ?? 'right'}
                labelCol={getLabelCol()}
                wrapperCol={getWrapperCol()}
                validateMessages={validateMessages}
                layout={formType}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Suspense fallback={<LoadingIndicatorComponent />}>
                    <>
                        {formContent !== undefined ? formContent : (<DataFormContentComponent />)}
                    </>
                </Suspense>
                {children}
            </Form>
        </FormContext.Provider>
    );
};

export default DataFormComponent;
