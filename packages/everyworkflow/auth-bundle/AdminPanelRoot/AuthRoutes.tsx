/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const RoleListPage = lazy(() => import("@everyworkflow/auth-bundle/Admin/Page/RoleListPage"));
const RoleFormPage = lazy(() => import("@everyworkflow/auth-bundle/Admin/Page/RoleFormPage"));

export const AuthRoutes = [
    {
        path: '/system/role',
        exact: true,
        component: RoleListPage
    },
    {
        path: '/system/role/create',
        exact: true,
        component: RoleFormPage
    },
    {
        path: '/system/role/:uuid/edit',
        exact: true,
        component: RoleFormPage
    },
];
