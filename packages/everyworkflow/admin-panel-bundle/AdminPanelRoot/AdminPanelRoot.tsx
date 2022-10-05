/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PanelLayoutComponent from "@everyworkflow/admin-panel-bundle/Component/PanelLayoutComponent";
import AdminPanelContext from "@everyworkflow/admin-panel-bundle/Context/AdminPanelContext";
import { adminPanelState } from "@everyworkflow/admin-panel-bundle/State/AdminPanelState";
import AdminPanelReducer from "@everyworkflow/admin-panel-bundle/Reducer/AdminPanelReducer";
import RouteMapRenderComponent from "@everyworkflow/panel-bundle/Component/RouteMapRenderComponent";
import { RouteMaps } from "@everyworkflow/admin-panel-bundle/AdminPanelRoot/RouteMaps";
import ScrollToTopOnRouteChange from '@everyworkflow/panel-bundle/Component/ScrollToTopOnRouteChange';
import PanelContext from '@everyworkflow/panel-bundle/Context/PanelContext';
import LoginPage from '@everyworkflow/auth-bundle/Admin/Page/LoginPage';

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
