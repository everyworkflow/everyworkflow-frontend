/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const DataFormPage = lazy(() => import("@everyworkflow/admin-panel-bundle/Page/Examples/DataFormPage"));
const DragAndDropPage = lazy(() => import("@everyworkflow/admin-panel-bundle/Page/Examples/DragAndDropPage"));

export const ExampleRoutes = [
    {
        path: '/examples/data-form',
        exact: true,
        component: DataFormPage
    },
    {
        path: '/examples/drag-and-drop',
        exact: true,
        component: DragAndDropPage
    },
];
