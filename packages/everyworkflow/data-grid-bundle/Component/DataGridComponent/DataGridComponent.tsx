/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useEffect, useReducer, useContext } from 'react';
import { dataGridState } from "@everyworkflow/data-grid-bundle/State/DataGridState";
import DataGridContext from '@everyworkflow/data-grid-bundle/Context/DataGridContext';
import DataGridReducer from '@everyworkflow/data-grid-bundle/Reducer/DataGridReducer';
import TableComponent from '@everyworkflow/data-grid-bundle/Component/TableComponent';
import InitDataGridAction from '@everyworkflow/data-grid-bundle/Action/InitDataGridAction';
import PageWrapperComponent from "@everyworkflow/data-grid-bundle/Component/PageWrapperComponent";
import AlertAction, { ALERT_TYPE_ERROR } from "@everyworkflow/panel-bundle/Action/AlertAction";
import PopupFormComponent from '@everyworkflow/data-grid-bundle/Component/PopupFormComponent';
import "@everyworkflow/data-grid-bundle/DataGridStyle.less";

export const DATA_GRID_TYPE_INLINE = 'type_inline'; // default
export const DATA_GRID_TYPE_PAGE = 'type_page';

interface DataGridComponentProps {
    dataGridUrl?: string;
    dataGridType?: string;
    children?: JSX.Element | JSX.Element[];
    gridHeaderActionMaps?: any;
    gridRowActionMaps?: any;
    gridBulkActionMaps?: any;
    gridColumnMaps?: any;
    gridFilterFieldsMaps?: any;
}

const DataGridComponent = ({
    dataGridUrl,
    dataGridType = DATA_GRID_TYPE_INLINE,
    children,
    gridHeaderActionMaps,
    gridRowActionMaps,
    gridBulkActionMaps,
    gridColumnMaps,
    gridFilterFieldsMaps
}: DataGridComponentProps) => {
    const [state, dispatch] = useReducer(DataGridReducer, {
        ...dataGridState,
        grid_header_action_maps: gridHeaderActionMaps ?? {},
        grid_row_action_maps: gridRowActionMaps ?? {},
        grid_bulk_action_maps: gridBulkActionMaps ?? {},
        grid_column_maps: gridColumnMaps ?? {},
        grid_filter_fields_maps: gridFilterFieldsMaps ?? {},
    });

    useEffect(() => {
        if (dataGridUrl) {
            try {
                InitDataGridAction(dataGridUrl)(dispatch);
            } catch (error: any) {
                AlertAction({
                    description: error.message,
                    message: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                });
            }
        }
    }, [dataGridUrl, dispatch]);

    return (
        <>
            <DataGridContext.Provider
                value={{
                    state: {
                        ...state,
                        data_grid_type: dataGridType,
                        data_grid_url: dataGridUrl,
                    },
                    dispatch: dispatch,
                }}>
                <>
                    {dataGridType === DATA_GRID_TYPE_INLINE && <TableComponent />}
                    {dataGridType === DATA_GRID_TYPE_PAGE && (
                        <PageWrapperComponent>
                            <TableComponent />
                        </PageWrapperComponent>
                    )}
                    {children}
                    {state.popup_form_data && (
                        <PopupFormComponent />
                    )}
                </>
            </DataGridContext.Provider>
        </>
    );
};

export default DataGridComponent;
