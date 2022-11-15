/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const ScopePage = lazy(() => import("@everyworkflow/scope-bundle/page/scope-page"));

export const ScopeRoutes = [
    {
        path: '/system/scope',
        exact: true,
        component: ScopePage
    },
    {
        path: '/system/scope/:code',
        exact: true,
        component: ScopePage
    },
];
