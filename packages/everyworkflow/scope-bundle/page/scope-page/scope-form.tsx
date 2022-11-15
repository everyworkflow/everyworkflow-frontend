/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useState } from 'react';
import Form from 'antd/lib/form';
import Card from 'antd/lib/card';
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import PageHeaderComponent from "@everyworkflow/admin-panel-bundle/component/page-header-component";
import DataFormComponent from "@everyworkflow/data-form-bundle/component/data-form-component";
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "@everyworkflow/panel-bundle/action/alert-action";
import { ACTION_SET_PAGE_TITLE } from '@everyworkflow/panel-bundle/reducer/panel-reducer';
import { FORM_TYPE_HORIZONTAL } from "@everyworkflow/data-form-bundle/component/data-form-component/data-form-component";
import ValidationError from '@everyworkflow/panel-bundle/error/validation-error';

interface ScopeFormProps {
    code?: string;
}

const ScopeForm = ({ code = 'default' }: ScopeFormProps) => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const [form] = Form.useForm();
    const [formErrors, setFormErrors] = useState<any>();
    const [remoteData, setRemoteData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        panelDispatch({
            type: ACTION_SET_PAGE_TITLE,
            payload: code !== 'default' ? 'Edit scope: ' + code : 'Scopes',
        });

        const handleResponse = (response: any) => {
            form.resetFields();
            setRemoteData(response);
            setLoading(false);
        };

        const fetchItem = async () => {
            try {
                setLoading(true);
                const response: any = await Remote.get('/scope/' + code + '?for=data-form');
                handleResponse(response);
            } catch (error: any) {
                AlertAction({
                    description: error.message,
                    message: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                });
                setLoading(false);
            }
        };

        fetchItem();
    }, [panelDispatch, code]);

    const onSubmit = async (data: any) => {
        const submitData: any = {};
        Object.keys(data).forEach(name => {
            if (data[name] !== undefined) {
                submitData[name] = data[name];
            }
        });

        const handlePostResponse = (response: any) => {
            AlertAction({
                description: response.detail,
                message: 'Form submit success',
                type: ALERT_TYPE_SUCCESS,
            });
        };

        try {
            const response = await Remote.post('/scope/' + code, submitData);
            handlePostResponse(response);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                setFormErrors(error.errors);
            }

            AlertAction({
                description: error.message,
                message: 'Submit error',
                type: ALERT_TYPE_ERROR,
            });
        }
    };

    return (
        <>
            <PageHeaderComponent
                title={code !== 'default' ? `Code: ${code}` : 'Create new scope'}
                actions={[
                    {
                        button_label: 'Save changes',
                        button_type: 'primary',
                        onClick: () => {
                            form.submit();
                        },
                    }
                ]}
                style={{ marginBottom: 24 }}
            />
            <Card
                className="app-container"
                title={'General'}
                style={{ marginBottom: 24 }}>
                {(!loading && remoteData) && (
                    <DataFormComponent
                        form={form}
                        initialValues={remoteData.item}
                        formErrors={formErrors}
                        formData={remoteData.data_form}
                        formType={FORM_TYPE_HORIZONTAL}
                        onSubmit={onSubmit}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    />
                )}
            </Card>
        </>
    );
};

export default ScopeForm;
