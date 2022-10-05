/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PanelContext from "@everyworkflow/panel-bundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import DataGridComponent from "@everyworkflow/data-grid-bundle/Component/DataGridComponent";
import { DATA_GRID_TYPE_PAGE } from "@everyworkflow/data-grid-bundle/Component/DataGridComponent/DataGridComponent";
import EntityCodeColumn from '@everyworkflow/eav-bundle/Admin/Page/Attribute/AttributeListPage/EntityCodeColumn';

const AttributeListPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const location = useLocation();

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Attribute list' });
    }, [panelDispatch]);

    return (
        <>
            <DataGridComponent
                dataGridUrl={'/eav/attribute' + location.search}
                dataGridType={DATA_GRID_TYPE_PAGE}
                gridColumnMaps={{ entity_code: EntityCodeColumn }}
            />
        </>
    );
};

export default AttributeListPage;
