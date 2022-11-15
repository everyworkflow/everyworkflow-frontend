/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const CategoryListPage = lazy(() => import("@everyworkflow/catalog-category-bundle/admin/page/category-list-page"));
const CategoryFormPage = lazy(() => import("@everyworkflow/catalog-category-bundle/admin/page/category-form-page"));

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
