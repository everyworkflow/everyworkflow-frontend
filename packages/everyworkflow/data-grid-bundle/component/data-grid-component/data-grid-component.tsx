/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useEffect, useReducer } from 'react';
import { dataGridState } from "@everyworkflow/data-grid-bundle/state/data-grid-state";
import DataGridContext from '@everyworkflow/data-grid-bundle/context/data-grid-context';
import DataGridReducer from '@everyworkflow/data-grid-bundle/reducer/data-grid-reducer';
import TableComponent from '@everyworkflow/data-grid-bundle/component/table-component';
import InitDataGridAction from '@everyworkflow/data-grid-bundle/action/init-data-grid-action';
import PageWrapperComponent from "@everyworkflow/data-grid-bundle/component/page-wrapper-component";
import AlertAction, { ALERT_TYPE_ERROR } from "@everyworkflow/panel-bundle/action/alert-action";
import PopupFormComponent from '@everyworkflow/data-grid-bundle/component/popup-form-component';

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
