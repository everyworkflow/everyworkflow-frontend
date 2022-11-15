/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const MediaManagerPage = lazy(() => import("@everyworkflow/media-manager-bundle/admin/page/media-manager-page"));

export const MediaManagerRoutes = [
    {
        path: '/media-manager',
        exact: true,
        component: MediaManagerPage
    },
];
