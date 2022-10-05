/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import PanelContext from "@everyworkflow/panel-bundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import MediaManagerComponent from "@everyworkflow/media-manager-bundle/Component/MediaManagerComponent";

const MediaManagerPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Media' });
    }, [panelDispatch]);

    return (
        <div className="app-container" style={{ paddingTop: 16 }}>
            <MediaManagerComponent />
        </div>
    );
};

export default MediaManagerPage;
