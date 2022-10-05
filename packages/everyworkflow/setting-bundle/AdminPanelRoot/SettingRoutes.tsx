/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const SettingPage = lazy(() => import("@everyworkflow/setting-bundle/Admin/Page/SettingPage"));

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
