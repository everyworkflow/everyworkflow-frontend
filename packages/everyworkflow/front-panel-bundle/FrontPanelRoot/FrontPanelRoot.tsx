/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTopOnRouteChange from "@everyworkflow/panel-bundle/Component/ScrollToTopOnRouteChange";
import FrontendLayoutComponent from "@everyworkflow/front-panel-bundle/Component/FrontPanelLayoutComponent";
import RouteMapRenderComponent from "@everyworkflow/panel-bundle/Component/RouteMapRenderComponent";
import { RouteMaps } from "@everyworkflow/front-panel-bundle/FrontPanelRoot/RouteMaps";
import FrontendContext from "@everyworkflow/front-panel-bundle/Context/FrontendContext";
import FrontendReducer from "@everyworkflow/front-panel-bundle/Reducer/FrontendReducer";
import { frontendState } from "@everyworkflow/front-panel-bundle/State/FrontendState";
import RootPanelComponent from '@everyworkflow/panel-bundle/Component/RootPanelComponent';

const FrontPanelRoot = () => {
    const [state, dispatch] = useReducer(FrontendReducer, frontendState);

    return (
        <RootPanelComponent>
            <FrontendContext.Provider value={{ state, dispatch }}>
                <BrowserRouter>
                    <ScrollToTopOnRouteChange>
                        <FrontendLayoutComponent>
                            <RouteMapRenderComponent routeMaps={RouteMaps} />
                        </FrontendLayoutComponent>
                    </ScrollToTopOnRouteChange>
                </BrowserRouter>
            </FrontendContext.Provider>
        </RootPanelComponent>
    );
};

export default FrontPanelRoot;
