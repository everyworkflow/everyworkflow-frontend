/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const UserListPage = lazy(() => import("@everyworkflow/user-bundle/Admin/Page/UserListPage"));
const UserFormPage = lazy(() => import("@everyworkflow/user-bundle/Admin/Page/UserFormPage"));

export const UserRoutes = [
    {
        path: '/user',
        exact: true,
        component: UserListPage
    },
    {
        path: '/user/create',
        exact: true,
        component: UserFormPage
    },
    {
        path: '/user/:uuid/edit',
        exact: true,
        component: UserFormPage
    },
];
