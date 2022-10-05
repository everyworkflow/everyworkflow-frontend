/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import PanelContext from "@everyworkflow/panel-bundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import DataGridComponent from "@everyworkflow/data-grid-bundle/Component/DataGridComponent";
import { DATA_GRID_TYPE_PAGE } from "@everyworkflow/data-grid-bundle/Component/DataGridComponent/DataGridComponent";
import { useLocation } from "react-router-dom";

const ProductListPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const location = useLocation();

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Catalog product' });
    }, [panelDispatch]);

    return (
        <>
            <DataGridComponent
                dataGridUrl={'/catalog/product' + location.search}
                dataGridType={DATA_GRID_TYPE_PAGE}
            />
        </>
    );
};

export default ProductListPage;
