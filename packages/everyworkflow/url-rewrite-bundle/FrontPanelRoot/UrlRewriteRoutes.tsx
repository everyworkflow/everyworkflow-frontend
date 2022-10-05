/*
 * @copyright EveryWorkflow. All rights reserved.
 */

// import {lazy} from "react";
// const HomePage = lazy(() => import("@EveryWorkflow/FrontendBundle/Page/HomePage"));

import FinalPage from "@everyworkflow/url-rewrite-bundle/Page/FinalPage";

export const UrlRewriteRoutes = [
    {
        path: '*',
        component: FinalPage
    },
];
