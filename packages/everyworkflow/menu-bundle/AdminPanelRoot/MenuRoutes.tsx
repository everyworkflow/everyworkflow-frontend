/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const MenuListPage = lazy(() => import("@everyworkflow/menu-bundle/Admin/Page/MenuListPage"));
const MenuFormPage = lazy(() => import("@everyworkflow/menu-bundle/Admin/Page/MenuFormPage"));
const MenuBuilderPage = lazy(() => import("@everyworkflow/menu-bundle/Admin/Page/MenuBuilderPage"));

export const MenuRoutes = [
    {
        path: '/system/menu',
        exact: true,
        component: MenuListPage
    },
    {
        path: '/system/menu/create',
        exact: true,
        component: MenuFormPage
    },
    {
        path: '/system/menu/:code',
        exact: true,
        component: MenuFormPage
    },
    {
        path: '/system/menu/:code/menu-builder',
        exact: true,
        component: MenuBuilderPage
    },
];
