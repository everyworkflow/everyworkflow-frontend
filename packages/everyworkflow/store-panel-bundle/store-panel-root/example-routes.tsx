/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const DataFormPage = lazy(() => import("@everyworkflow/admin-panel-bundle/page/examples/data-form-page"));
const DataFormBlockPage = lazy(() => import("@everyworkflow/store-panel-bundle/page/example/data-form-block-page"));
const PageBuilderEditPage = lazy(() => import("@everyworkflow/store-panel-bundle/page/example/page-builder-edit-page"));

export const ExampleRoutes = [
    {
        path: '/examples/data-form',
        exact: true,
        component: DataFormPage
    },
    {
        path: '/examples/data-form-block',
        exact: true,
        component: DataFormBlockPage
    },
    {
        path: '/examples/page-builder-edit-page',
        exact: true,
        component: PageBuilderEditPage
    },
];
