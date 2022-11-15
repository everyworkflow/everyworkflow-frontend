/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const CustomerListPage = lazy(() => import("@everyworkflow/customer-bundle/admin/page/customer-list-page"));
const CustomerFormPage = lazy(() => import("@everyworkflow/customer-bundle/admin/page/customer-form-page"));

export const CustomerRoutes = [
    {
        path: '/customer',
        exact: true,
        component: CustomerListPage
    },
    {
        path: '/customer/create',
        exact: true,
        component: CustomerFormPage
    },
    {
        path: '/customer/:uuid/edit',
        exact: true,
        component: CustomerFormPage
    },
];
