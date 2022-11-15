/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PanelLayoutComponent from "@everyworkflow/admin-panel-bundle/component/panel-layout-component";
import AdminPanelContext from "@everyworkflow/admin-panel-bundle/context/admin-panel-context";
import { adminPanelState } from "@everyworkflow/admin-panel-bundle/state/admin-panel-state";
import AdminPanelReducer from "@everyworkflow/admin-panel-bundle/reducer/admin-panel-reducer";
import RouteMapRenderComponent from "@everyworkflow/panel-bundle/component/route-map-render-component";
import { RouteMaps } from "@everyworkflow/admin-panel-bundle/admin-panel-root/route-maps";
import ScrollToTopOnRouteChange from '@everyworkflow/panel-bundle/component/scroll-to-top-on-route-change';
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';
import LoginPage from '@everyworkflow/auth-bundle/admin/page/login-page';

const AdminPanelRoot = () => {
    const { state: panelState } = useContext(PanelContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [state, dispatch] = useReducer(AdminPanelReducer, adminPanelState);

    useEffect(() => {
        if (panelState.auth) {
            setIsLoggedIn(true);
        }
    }, [panelState.auth]);

    return (
        <AdminPanelContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                {isLoggedIn ? (
                    <ScrollToTopOnRouteChange>
                        <PanelLayoutComponent>
                            <RouteMapRenderComponent routeMaps={RouteMaps} />
                        </PanelLayoutComponent>
                    </ScrollToTopOnRouteChange>
                ) : (
                    <LoginPage />
                )}
            </BrowserRouter>
        </AdminPanelContext.Provider>
    );
};

export default AdminPanelRoot;
