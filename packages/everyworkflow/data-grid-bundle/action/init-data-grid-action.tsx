/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { ACTION_SET_GRID_DATA } from '@everyworkflow/data-grid-bundle/reducer/data-grid-reducer';
import FetchRemoteData from '@everyworkflow/data-grid-bundle/action/fetch-remote-data';
import DataGridInterface from '@everyworkflow/data-grid-bundle/model/data-grid-interface';
import BaseFieldInterface from '@everyworkflow/data-form-bundle/model/field/base-field-interface';
import DataGridColumnInterface from '@everyworkflow/data-grid-bundle/model/data-grid-column-interface';
import AlertAction, { ALERT_TYPE_ERROR } from '@everyworkflow/panel-bundle/action/alert-action';
import DataFormInterface from '@everyworkflow/data-form-bundle/model/data-form-interface';
import BaseSectionInterface from '@everyworkflow/data-form-bundle/model/section/base-section-interface';

const InitDataGridAction = (dataGridUrl: string) => {

    const initDataGrid = (dispatch: any, data: DataGridInterface) => {

        const getColumnState = (dataFormOrSection: DataFormInterface | BaseSectionInterface): Array<DataGridColumnInterface> => {
            let columnState: Array<DataGridColumnInterface> = [];
            dataFormOrSection.fields?.forEach((field: BaseFieldInterface) => {
                if (field.name) {
                    columnState.push({
                        name: field.name,
                        sort_order: field.sort_order,
                        is_active: data.data_grid_config?.active_columns?.includes(field.name),
                        is_sortable: data.data_grid_config?.sortable_columns?.includes(field.name),
                        is_filterable: data.data_grid_config?.filterable_columns?.includes(field.name),
                    });
                }
            });
            if (dataFormOrSection.sections) {
                dataFormOrSection.sections.forEach((section: BaseSectionInterface) => {
                    columnState = [...columnState, ...getColumnState(section)];
                });
            }
            return columnState;
        }

        if (data.data_form) {
            const currentColumnState = getColumnState(data.data_form);
            dispatch({
                type: ACTION_SET_GRID_DATA,
                payload: { ...data, data_grid_column_state: currentColumnState },
            });
        }
    }

    return async (dispatch: any) => {
        if (!dataGridUrl) {
            return false;
        }

        FetchRemoteData(dataGridUrl).then((data: DataGridInterface) => {
            initDataGrid(dispatch, data);
        }).catch((error: any) => {
            AlertAction({
                description: error.message,
                message: 'Fetch error',
                type: ALERT_TYPE_ERROR,
            });
        });
    };
};

export default InitDataGridAction;
