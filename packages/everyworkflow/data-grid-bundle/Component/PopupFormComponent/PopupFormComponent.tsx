/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useEffect, useContext, useState } from 'react';
import SidePanelComponent from '@everyworkflow/panel-bundle/Component/SidePanelComponent';
import { PANEL_SIZE_FULL } from '@everyworkflow/panel-bundle/Component/SidePanelComponent/SidePanelComponent';
import Form from 'antd/lib/form';
import DataForm from '@everyworkflow/data-form-bundle/Component/DataFormComponent';
import { FORM_TYPE_HORIZONTAL } from '@everyworkflow/data-form-bundle/Component/DataFormComponent/DataFormComponent';
import AlertAction, { ALERT_TYPE_ERROR } from '@everyworkflow/panel-bundle/Action/AlertAction';
import DataGridContext from '@everyworkflow/data-grid-bundle/Context/DataGridContext';
import Remote from '@everyworkflow/panel-bundle/Service/Remote';
import { ACTION_SET_POPUP_FORM_DATA } from '@everyworkflow/data-grid-bundle/Reducer/DataGridReducer';

const PopupFormComponent = () => {
    const { state: gridState, dispatch: gridDispatch } = useContext(DataGridContext);
    const [remoteData, setRemoteData] = useState<any>();
    const [form] = Form.useForm();

    useEffect(() => {
        const handleResponse = (response: any) => {
            if (response.data_form) {
                setRemoteData(response);
            }
        };

        (async () => {
            if (!gridState.popup_form_data?.get_path) {
                return;
            }

            try {
                const response: any = await Remote.get(gridState.popup_form_data?.get_path);
                handleResponse(response);
            } catch (error: any) {
                AlertAction({
                    description: error.message,
                    message: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                });
            }
        })();
    }, [gridState.popup_form_data]);

    const onPanelClose = () => {
        gridDispatch({ type: ACTION_SET_POPUP_FORM_DATA, payload: undefined });
    }

    const onFormSubmit = (data: any) => {

    }

    return (
        <SidePanelComponent
            title={'Settings'}
            size={PANEL_SIZE_FULL}
            onClose={onPanelClose}
            bodyStyle={{ backgroundColor: '#f0f2f5' }}
            footerStyle={{ textAlign: 'center' }}>
            {remoteData && (
                <DataForm
                    form={form}
                    initialValues={remoteData.item}
                    formData={remoteData.data_form}
                    formType={FORM_TYPE_HORIZONTAL}
                    onSubmit={onFormSubmit}
                />
            )}
        </SidePanelComponent>
    );
}

export default PopupFormComponent;