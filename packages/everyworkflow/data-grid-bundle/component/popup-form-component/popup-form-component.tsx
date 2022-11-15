/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useEffect, useContext, useState } from 'react';
import Form from 'antd/lib/form';
import SidePanelComponent from '@everyworkflow/panel-bundle/component/side-panel-component';
import { PANEL_SIZE_FULL } from '@everyworkflow/panel-bundle/component/side-panel-component/side-panel-component';
import DataForm from '@everyworkflow/data-form-bundle/component/data-form-component';
import { FORM_TYPE_HORIZONTAL } from '@everyworkflow/data-form-bundle/component/data-form-component/data-form-component';
import AlertAction, { ALERT_TYPE_ERROR } from '@everyworkflow/panel-bundle/action/alert-action';
import DataGridContext from '@everyworkflow/data-grid-bundle/context/data-grid-context';
import Remote from '@everyworkflow/panel-bundle/service/remote';
import { ACTION_SET_POPUP_FORM_DATA } from '@everyworkflow/data-grid-bundle/reducer/data-grid-reducer';

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