/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const EntityListPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/entity/entity-list-page"));
const EntityFormPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/entity/entity-form-page"));
const AttributeListPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/attribute/attribute-list-page"));
const AttributeFormPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/attribute/attribute-form-page"));
const AttributeGroupListPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/attribute-group/attribute-group-list-page"));
const AttributeGroupFormPage = lazy(() => import("@everyworkflow/eav-bundle/admin/page/attribute-group/attribute-group-form-page"));

export const EavRoutes = [
    {
        path: '/system/entity',
        component: EntityListPage
    },
    {
        path: '/system/entity/create',
        component: EntityFormPage
    },
    {
        path: '/system/entity/:code/edit',
        component: EntityFormPage
    },
    {
        path: '/system/attribute',
        component: AttributeListPage
    },
    {
        path: '/system/attribute/create',
        component: AttributeFormPage
    },
    {
        path: '/system/attribute/:code/edit',
        component: AttributeFormPage
    },
    {
        path: '/system/attribute-group',
        component: AttributeGroupListPage
    },
    {
        path: '/system/attribute-group/create',
        component: AttributeGroupFormPage
    },
    {
        path: '/system/attribute-group/:code/edit',
        component: AttributeGroupFormPage
    }
];
