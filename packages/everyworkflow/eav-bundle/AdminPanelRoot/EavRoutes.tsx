/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const EntityListPage = lazy(() => import("@everyworkflow/eav-bundle/Admin/Page/Entity/EntityListPage"));
const EntityFormPage = lazy(() => import("@everyworkflow/eav-bundle/Admin/Page/Entity/EntityFormPage"));
const AttributeListPage = lazy(() => import("@everyworkflow/eav-bundle/Admin/Page/Attribute/AttributeListPage"));
const AttributeFormPage = lazy(() => import("@everyworkflow/eav-bundle/Admin/Page/Attribute/AttributeFormPage"));

export const EavRoutes = [
    {
        path: '/system/entity',
        exact: true,
        component: EntityListPage
    },
    {
        path: '/system/entity/create',
        exact: true,
        component: EntityFormPage
    },
    {
        path: '/system/entity/:code/edit',
        exact: true,
        component: EntityFormPage
    },
    {
        path: '/system/attribute',
        exact: true,
        component: AttributeListPage
    },
    {
        path: '/system/attribute/create',
        exact: true,
        component: AttributeFormPage
    },
    {
        path: '/system/attribute/:code/edit',
        exact: true,
        component: AttributeFormPage
    }
];
