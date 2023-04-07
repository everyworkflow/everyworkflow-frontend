/*
* @copyright EveryWorkflow. All rights reserved.
*/

import { useContext, useEffect } from 'react';
import { Form, Card } from 'antd';
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';
import { ACTION_SET_PAGE_TITLE } from '@everyworkflow/panel-bundle/reducer/panel-reducer';
import DataFormComponent from '@everyworkflow/data-form-bundle/component/data-form-component';
import { FORM_TYPE_HORIZONTAL } from "@everyworkflow/data-form-bundle/component/data-form-component/data-form-component";

const DataFormPage = ({ apiData }: any) => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const [form] = Form.useForm();

    useEffect(() => {
        panelDispatch({
            type: ACTION_SET_PAGE_TITLE,
            payload: 'Data form example',
        });
    }, [panelDispatch]);

    const onSubmit = (data: any) => {
        console.log('FormBuilder --> onSubmit -->', data);
    };

    return (
        <>
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
                    />
                )}
            </Card>
        </>
    );
};

export default DataFormPage;
