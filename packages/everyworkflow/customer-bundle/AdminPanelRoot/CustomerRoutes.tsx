/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import {lazy} from "react";

const CustomerListPage = lazy(() => import("@everyworkflow/customer-bundle/Admin/Page/CustomerListPage"));
const CustomerFormPage = lazy(() => import("@everyworkflow/customer-bundle/Admin/Page/CustomerFormPage"));

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
