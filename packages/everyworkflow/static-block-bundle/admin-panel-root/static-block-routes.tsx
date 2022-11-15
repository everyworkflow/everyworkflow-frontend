/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const ListStaticBlockPage = lazy(() => import("@everyworkflow/static-block-bundle/admin/page/list-static-block-page"));
const StaticBlockFormPage = lazy(() => import("@everyworkflow/static-block-bundle/admin/page/static-block-form-page"));

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
