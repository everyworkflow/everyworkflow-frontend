/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const EntityListPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/entity/entity-list-page"));
const EntityFormPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/entity/entity-form-page"));
const AttributeListPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/attribute/attribute-list-page"));
const AttributeFormPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/attribute/attribute-form-page"));

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
