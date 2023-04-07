/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { theme } from 'antd';
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import MediaManagerComponent from "@everyworkflow/media-manager-bundle/component/media-manager-component";

const MediaManagerPage = () => {
    const { token } = theme.useToken();
    const { dispatch: panelDispatch } = useContext(PanelContext);

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Media' });
    }, [panelDispatch]);

    return (
        <div style={{
            paddingTop: 16,
            padding: token.paddingContentHorizontalLG,
        }}>
            <MediaManagerComponent />
        </div>
    );
};

export default MediaManagerPage;
