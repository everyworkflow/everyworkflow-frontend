/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const ProductListPage = lazy(() => import("@everyworkflow/catalog-product-bundle/admin/page/product-list-page"));
const ProductFormPage = lazy(() => import("@everyworkflow/catalog-product-bundle/admin/page/product-form-page"));

export const CatalogProductRoutes = [
    {
        path: '/catalog/product',
        exact: true,
        component: ProductListPage
    },
    {
        path: '/catalog/product/create',
        exact: true,
        component: ProductFormPage
    },
    {
        path: '/catalog/product/:uuid/edit',
        exact: true,
        component: ProductFormPage
    },
];
