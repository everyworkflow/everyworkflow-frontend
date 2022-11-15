/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTopOnRouteChange from "@everyworkflow/panel-bundle/component/scroll-to-top-on-route-change";
import FrontendLayoutComponent from "@everyworkflow/front-panel-bundle/component/front-panel-layout-component";
import RouteMapRenderComponent from "@everyworkflow/panel-bundle/component/route-map-render-component";
import { RouteMaps } from "@everyworkflow/front-panel-bundle/front-panel-root/route-maps";
import FrontendContext from "@everyworkflow/front-panel-bundle/context/frontend-context";
import FrontendReducer from "@everyworkflow/front-panel-bundle/reducer/frontend-reducer";
import { frontendState } from "@everyworkflow/front-panel-bundle/state/frontend-state";
import RootPanelComponent from '@everyworkflow/panel-bundle/component/root-panel-component';

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
