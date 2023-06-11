/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";
import CustomizeThemePage from "@everyworkflow/admin-panel-bundle/page/customize-theme-page";

const DashboardPage = lazy(() => import("@everyworkflow/admin-panel-bundle/page/dashboard-page"));

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
    {
        path: '/customize-theme',
        exact: true,
        component: CustomizeThemePage
    },
];
