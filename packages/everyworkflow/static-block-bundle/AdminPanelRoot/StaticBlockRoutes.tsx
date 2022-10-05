/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const ListStaticBlockPage = lazy(() => import("@everyworkflow/static-block-bundle/Admin/Page/StaticBlock/ListStaticBlockPage"));
const StaticBlockFormPage = lazy(() => import("@everyworkflow/static-block-bundle/Admin/Page/StaticBlock/StaticBlockFormPage"));

export const StaticBlockRoutes = [
    {
        path: '/cms/static-block',
        exact: true,
        component: ListStaticBlockPage
    },
    {
        path: '/cms/static-block/create',
        exact: true,
        component: StaticBlockFormPage
    },
    {
        path: '/cms/static-block/:uuid/edit',
        exact: true,
        component: StaticBlockFormPage
    },
];
