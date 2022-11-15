/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const OrderListPage = lazy(() => import("@everyworkflow/sales-order-bundle/admin/page/order-list-page"));
const OrderFormPage = lazy(() => import("@everyworkflow/sales-order-bundle/admin/page/order-form-page"));

export const SalesOrderRoutes = [
    {
        path: '/sales/order',
        exact: true,
        component: OrderListPage
    },
    {
        path: '/sales/order/create',
        exact: true,
        component: OrderFormPage
    },
    {
        path: '/sales/order/:uuid/edit',
        exact: true,
        component: OrderFormPage
    },
];
