/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import DataGridComponent from "@everyworkflow/data-grid-bundle/component/data-grid-component";
import { DATA_GRID_TYPE_PAGE } from "@everyworkflow/data-grid-bundle/component/data-grid-component/data-grid-component";
import EntityCodeColumn from '@everyworkflow/eav-bundle/column/entity-code-column';

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
