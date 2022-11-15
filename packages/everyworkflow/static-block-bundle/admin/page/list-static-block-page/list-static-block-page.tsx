/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import DataGridComponent from "@everyworkflow/data-grid-bundle/component/data-grid-component";
import { DATA_GRID_TYPE_PAGE } from "@everyworkflow/data-grid-bundle/component/data-grid-component/data-grid-component";

const ListStaticBlockPage = () => {
    const { dispatch: panelState } = useContext(PanelContext);
    const location = useLocation();

    useEffect(() => {
        panelState({ type: ACTION_SET_PAGE_TITLE, payload: 'Static block' });
    }, [panelState]);

    return (
        <>
            <DataGridComponent
                dataGridUrl={'/cms/static-block' + location.search}
                dataGridType={DATA_GRID_TYPE_PAGE}
            />
        </>
    );
};

export default ListStaticBlockPage;
