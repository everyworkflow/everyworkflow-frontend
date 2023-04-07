/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback } from 'react';
import { Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import ButtonRowActionInterface from '@everyworkflow/data-grid-bundle/model/row-action/button-row-action-interface';
import DataGridContext from '@everyworkflow/data-grid-bundle/context/data-grid-context';
import Remote from '@everyworkflow/panel-bundle/service/remote';
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';
import { ACTION_SET_POPUP_FORM_DATA } from '@everyworkflow/data-grid-bundle/reducer/data-grid-reducer';
import InitDataGridAction from '@everyworkflow/data-grid-bundle/action/init-data-grid-action';

interface ButtonRowActionProps {
    actionData: ButtonRowActionInterface;
    rowData?: any;
}

const ButtonRowAction = ({ actionData, rowData }: ButtonRowActionProps) => {
    const { state: gridState, dispatch: gridDispatch } = useContext(DataGridContext);
    const navigate = useNavigate();

    const generateFilledPath = (path: string) => {
        Object.keys(rowData).forEach((itemKey: string) => {
            path = path.replace(
                '{' + itemKey + '}',
                rowData[itemKey]
            );
        });
        return path;
    }

    const reloadDataGrid = () => {
        if (!gridState.data_grid_url) {
            return;
        }

        try {
            InitDataGridAction(gridState.data_grid_url)(gridDispatch);
        } catch (error: any) {
            AlertAction({
                description: error.message,
                message: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        }
    }

    const handleAction = async () => {
        if (actionData.onClick) {
            actionData.onClick();
        }

        if (!actionData.button_path) {
            return;
        }

        if (actionData.path_type === 'post_call') {
            try {
                const response = await Remote.post(generateFilledPath(actionData.button_path), {});
                reloadDataGrid();
                AlertAction({
                    message: response.title,
                    description: response.detail,
                    type: ALERT_TYPE_SUCCESS,
                });
            } catch (error: any) {
                AlertAction({
                    message: error.message,
                });
            }
        } else if (actionData.path_type === 'delete_call') {
            try {
                const response = await Remote.delete(generateFilledPath(actionData.button_path));
                reloadDataGrid();
                AlertAction({
                    message: response.title,
                    description: response.detail,
                    type: ALERT_TYPE_SUCCESS,
                });
            } catch (error: any) {
                AlertAction({
                    message: error.message,
                });
            }
        } else if (actionData.path_type === 'external') {
            (window as any).open(generateFilledPath(actionData.button_path), actionData.button_target);
        } else if (actionData.path_type === 'popup_form') {
            gridDispatch({
                type: ACTION_SET_POPUP_FORM_DATA,
                payload: {
                    get_path: generateFilledPath(actionData.button_path),
                }
            });
        } else {
            navigate(generateFilledPath(actionData.button_path));
        }
    }

    const renderMenuContent = useCallback(() => {
        if (gridState.data_grid_config?.row_action_type === 'dropdown') {
            return (
                <span className="ant-dropdown-menu-title-content">{actionData.button_label}</span>
            );
        }

        return (
            <Button
                onClick={actionData.is_confirm ? undefined : handleAction}
                type={actionData.button_type ?? 'link'}
                danger={actionData.is_danger}>{actionData.button_label}</Button>
        );
    }, [gridState.data_grid_config?.row_action_type]);

    const renderConfirmedMenuContent = () => {
        if (actionData.is_confirm) {
            return (
                <Popconfirm
                    placement="topRight"
                    overlayClassName="data-grid-row-action-confirm"
                    title={actionData.confirm_message ?? "Are you sure？"}
                    onConfirm={handleAction}
                    okText="Yes"
                    cancelText="No">
                    {renderMenuContent()}
                </Popconfirm>
            );
        }

        return renderMenuContent();
    };

    return (
        <>
            {gridState.data_grid_config?.row_action_type === 'dropdown' ? (
                <li className="ant-dropdown-menu-item"
                    onClick={actionData.is_confirm ? undefined : handleAction}>{renderConfirmedMenuContent()}</li>
            ) : renderConfirmedMenuContent()}
        </>
    );
};

export default ButtonRowAction;
