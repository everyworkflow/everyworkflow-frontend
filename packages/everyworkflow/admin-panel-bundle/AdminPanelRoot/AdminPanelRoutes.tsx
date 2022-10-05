/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const DashboardPage = lazy(() => import("@everyworkflow/admin-panel-bundle/Page/DashboardPage"));

export const AdminPanelRoutes = [
    {
        path: '/',
        exact: true,
        component: DashboardPage
    },
    {
        path: '/dashboard',
        exact: true,
        component: DashboardPage
    },
];
