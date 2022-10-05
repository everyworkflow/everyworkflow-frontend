/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { Suspense } from 'react';
import RouteItemInterface from "@everyworkflow/panel-bundle/Model/RouteItemInterface";
import Error404Component from "@everyworkflow/panel-bundle/Component/Error404Component";
import { Routes, Route } from "react-router-dom";
import LoadingIndicatorComponent from "@everyworkflow/panel-bundle/Component/LoadingIndicatorComponent";

interface RouteMapRenderComponentProps {
    routeMaps: Array<any>;
}

const RouteMapRenderComponent = ({ routeMaps }: RouteMapRenderComponentProps) => {
    const routeList: Array<RouteItemInterface> = [];
    routeMaps.forEach(routes => {
        routes.map((routeItem: RouteItemInterface) => {
            routeList.push(routeItem);
        });
    });
    routeList.push({
        component: Error404Component,
        path: '*'
    });

    return (
        <Suspense fallback={<LoadingIndicatorComponent />}>
            <Routes>
                {routeList.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default RouteMapRenderComponent;
