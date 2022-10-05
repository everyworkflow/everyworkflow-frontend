/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const DataFormPage = lazy(() => import("@everyworkflow/admin-panel-bundle/Page/Examples/DataFormPage"));
const DataFormBlockPage = lazy(() => import("@everyworkflow/front-panel-bundle/Page/Example/DataFormBlockPage"));
const PageBuilderEditPage = lazy(() => import("@everyworkflow/front-panel-bundle/Page/Example/PageBuilderEditPage"));

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
