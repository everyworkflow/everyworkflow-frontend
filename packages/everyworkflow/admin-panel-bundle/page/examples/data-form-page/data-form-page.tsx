/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback, useContext, useEffect, useState, lazy } from 'react';
import { Form, Card } from 'antd';
import Remote from "@everyworkflow/panel-bundle/service/remote";
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';
import { ACTION_SET_PAGE_TITLE } from '@everyworkflow/panel-bundle/reducer/panel-reducer';
import DataFormComponent from '@everyworkflow/data-form-bundle/component/data-form-component';
import PageHeaderComponent from '@everyworkflow/admin-panel-bundle/component/page-header-component';
import BreadcrumbComponent from '@everyworkflow/admin-panel-bundle/component/breadcrumb-component';
import MediaPanelComponent from '@everyworkflow/media-manager-bundle/component/media-panel-component';
import { MEDIA_MANAGER_TYPE_MULTI_SELECT } from '@everyworkflow/media-manager-bundle/component/media-manager-component/media-manager-component';
import AlertAction, { ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';
import { FORM_TYPE_HORIZONTAL } from "@everyworkflow/data-form-bundle/component/data-form-component/data-form-component";

const cascader_options = [
    {
        value: 'Nepal',
        label: 'Nepal',
        children: [
            {
                value: 'Kathmandu',
                label: 'Kathmandu',
                children: [
                    {
                        value: 'Baneshwor',
                        label: 'Baneshwor',
                    },
                    {
                        value: 'Maitidevi',
                        label: 'Maitidevi',
                        disabled: true,
                    },
                ],
            },
        ],
    },
    {
        value: 'Pokahara',
        label: 'Pokahara',
        children: [
            {
                value: 'Lake Side',
                label: 'Lake Side',
                children: [
                    {
                        value: 'Fewa',
                        label: 'Fewa',
                    },
                ],
            },
        ],
    },
];

const multi_select_options = [
    {
        title: 'Programming',
        value: '0-0',
        children: [
            {
                title: 'Php',
                value: '0-0-1',
            },
            {
                title: 'Javascript',
                value: '0-0-2',
            },
            {
                title: 'C ++',
                value: '0-0-3',
            },
        ],
    },
    {
        title: 'Movies',
        value: '0-1',
    },
];

const mockData = [
    {
        label: 'Address',
        field_type: 'cascader',
        name: 'address',
        sort_order: 0,
        _id: 'address',
        options: cascader_options,
    },
    {
        label: 'Hobbies',
        field_type: 'multi_select',
        name: 'hobbies',
        sort_order: 0,
        _id: 'hobbies',
        options: multi_select_options,
        treeProps: { treeCheckable: true, showCheckedStrategy: false },
    },
];

const DataFormPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const [state, setState] = useState(false);
    const [apiData, setApiData] = useState<any>(false);
    const [form] = Form.useForm();

    const onSidePanelClose = useCallback(() => {
        setState(false);
    }, []);

    useEffect(() => {
        panelDispatch({
            type: ACTION_SET_PAGE_TITLE,
            payload: 'Data form example',
        });
        const run = async () => {
            let data = await Remote.get('/admin-panel/example/data-form?for=data-form');
            data.fields.splice(10, 0, ...mockData);
            setApiData(data);
        };
        run();
    }, [panelDispatch]);

    const onSubmit = (data: any) => {
        console.log('FormBuilder --> onSubmit -->', data);
    };

    return (
        <>
            {state && (
                <MediaPanelComponent
                    initType={MEDIA_MANAGER_TYPE_MULTI_SELECT}
                    onClose={onSidePanelClose}
                />
            )}
            <PageHeaderComponent
                title={'Edit ID: 12'}
                actions={[
                    {
                        button_label: 'Open popup',
                        button_type: 'primary',
                        onClick: () => {
                            console.log('opening popup :D');
                            setState(true);
                        },
                    },
                    {
                        button_label: 'Save changes',
                        button_type: 'primary',
                        onClick: () => {
                            console.log('Save changes');
                            form.submit();
                            AlertAction({
                                description: 'Form data has been console logged.',
                                message: 'Form changes saved!',
                                type: ALERT_TYPE_SUCCESS,
                            });
                        },
                    },
                    {
                        button_label: 'Save and continue',
                        button_type: 'primary',
                        onClick: () => {
                            console.log('Save and continue');
                            form.submit();
                            AlertAction({
                                description: 'Form data has been console logged.',
                                message: 'Form changes saved!',
                                type: ALERT_TYPE_SUCCESS,
                            });
                        },
                    },
                ]}
            />
            <BreadcrumbComponent />
            <Card
                className="app-container"
                title={'Horizontal form - Root'}
                style={{ marginBottom: 24 }}>
                {apiData && (
                    <DataFormComponent
                        formId={'example-form-builder'}
                        form={form}
                        formData={apiData}
                        formType={FORM_TYPE_HORIZONTAL}
                        onSubmit={onSubmit}
                        formFieldMaps={{
                            email: lazy(
                                () => import('@everyworkflow/admin-panel-bundle/page/examples/data-form-page/text-field')
                            )
                        }}
                    />
                )}
            </Card>
        </>
    );
};

export default DataFormPage;
