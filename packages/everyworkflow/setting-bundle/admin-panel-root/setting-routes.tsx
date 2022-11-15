/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const SettingPage = lazy(() => import("@everyworkflow/setting-bundle/admin/page/setting-page"));

export const SettingRoutes = [
    {
        path: '/setting',
        component: SettingPage
    },
    {
        path: '/setting/:code',
        component: SettingPage
    },
];
