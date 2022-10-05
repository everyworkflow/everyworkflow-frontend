/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PanelContext from "@everyworkflow/panel-bundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import DataGridComponent from "@everyworkflow/data-grid-bundle/Component/DataGridComponent";
import { DATA_GRID_TYPE_PAGE } from "@everyworkflow/data-grid-bundle/Component/DataGridComponent/DataGridComponent";

const EntityListPage = () => {
    const { dispatch: panelState } = useContext(PanelContext);
    const location = useLocation();

    useEffect(() => {
        panelState({ type: ACTION_SET_PAGE_TITLE, payload: 'Entity list' });
    }, [panelState]);

    return (
        <>
            <DataGridComponent
                dataGridUrl={'/eav/entity' + location.search}
                dataGridType={DATA_GRID_TYPE_PAGE}
            />
        </>
    );
};

export default EntityListPage;
