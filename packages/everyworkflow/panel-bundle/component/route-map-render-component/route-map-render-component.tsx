/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import RouteItemInterface from "@everyworkflow/panel-bundle/model/route-item-interface";
import Error404Component from "@everyworkflow/panel-bundle/component/error-404-component";
import LoadingIndicatorComponent from "@everyworkflow/panel-bundle/component/loading-indicator-component";

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
