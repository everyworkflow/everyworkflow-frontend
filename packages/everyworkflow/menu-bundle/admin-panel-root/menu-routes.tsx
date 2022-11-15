/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const MenuListPage = lazy(() => import("@everyworkflow/menu-bundle/admin/page/menu-list-page"));
const MenuFormPage = lazy(() => import("@everyworkflow/menu-bundle/admin/page/menu-form-page"));
const MenuBuilderPage = lazy(() => import("@everyworkflow/menu-bundle/admin/page/menu-builder-page"));

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
