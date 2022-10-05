/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useContext, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import PanelContext from "@everyworkflow/panel-bundle/Context/PanelContext";
import {ACTION_SET_PAGE_TITLE} from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import DataGridComponent from "@everyworkflow/data-grid-bundle/Component/DataGridComponent";
import {DATA_GRID_TYPE_PAGE} from "@everyworkflow/data-grid-bundle/Component/DataGridComponent/DataGridComponent";

const RoleListPage = () => {
    const {dispatch: panelDispatch} = useContext(PanelContext);
    const location = useLocation();

    useEffect(() => {
        panelDispatch({type: ACTION_SET_PAGE_TITLE, payload: 'Role list'});
    }, [panelDispatch]);

    return (
        <>
            <DataGridComponent
                dataGridUrl={'/auth/role' + location.search}
                dataGridType={DATA_GRID_TYPE_PAGE}
            />
        </>
    );
};

export default RoleListPage;
