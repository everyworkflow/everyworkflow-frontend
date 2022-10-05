/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const MediaManagerPage = lazy(() => import("@everyworkflow/media-manager-bundle/Admin/Page/MediaManagerPage"));

export const MediaManagerRoutes = [
    {
        path: '/media-manager',
        exact: true,
        component: MediaManagerPage
    },
];
