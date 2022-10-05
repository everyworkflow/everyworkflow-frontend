/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const CategoryListPage = lazy(() => import("@everyworkflow/catalog-category-bundle/Admin/Page/CategoryListPage"));
const CategoryFormPage = lazy(() => import("@everyworkflow/catalog-category-bundle/Admin/Page/CategoryFormPage"));

export const CatalogCategoryRoutes = [
    {
        path: '/catalog/category',
        exact: true,
        component: CategoryListPage
    },
    {
        path: '/catalog/category/create',
        exact: true,
        component: CategoryFormPage
    },
    {
        path: '/catalog/category/:uuid/edit',
        exact: true,
        component: CategoryFormPage
    },
];
