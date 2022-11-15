/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTopOnRouteChange from "@everyworkflow/panel-bundle/component/scroll-to-top-on-route-change";
import FrontendLayoutComponent from "@everyworkflow/store-panel-bundle/component/front-panel-layout-component";
import RouteMapRenderComponent from "@everyworkflow/panel-bundle/component/route-map-render-component";
import { RouteMaps } from "@everyworkflow/store-panel-bundle/store-panel-root/route-maps";
import FrontendContext from "@everyworkflow/store-panel-bundle/context/frontend-context";
import FrontendReducer from "@everyworkflow/store-panel-bundle/reducer/frontend-reducer";
import { frontendState } from "@everyworkflow/store-panel-bundle/state/frontend-state";
import RootPanelComponent from '@everyworkflow/panel-bundle/component/root-panel-component';

const StorePanelRoot = () => {
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

export default StorePanelRoot;
