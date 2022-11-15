/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const ListPage = lazy(() => import("@everyworkflow/page-bundle/admin/page/list-page"));
const FormPage = lazy(() => import("@everyworkflow/page-bundle/admin/page/form-page"));

export const PageRoutes = [
    {
        path: '/cms/page',
        exact: true,
        component: ListPage
    },
    {
        path: '/cms/page/create',
        exact: true,
        component: FormPage
    },
    {
        path: '/cms/page/:uuid/edit',
        exact: true,
        component: FormPage
    },
];
