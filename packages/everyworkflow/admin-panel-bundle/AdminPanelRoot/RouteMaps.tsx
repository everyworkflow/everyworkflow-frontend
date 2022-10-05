/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { AdminPanelRoutes } from "@everyworkflow/admin-panel-bundle/AdminPanelRoot/AdminPanelRoutes";
import { ExampleRoutes } from "@everyworkflow/admin-panel-bundle/AdminPanelRoot/ExampleRoutes";
import { MediaManagerRoutes } from "@everyworkflow/media-manager-bundle/AdminPanelRoot/MediaManagerRoutes";
import { EavRoutes } from "@everyworkflow/eav-bundle/AdminPanelRoot/EavRoutes";
import { UserRoutes } from "@everyworkflow/user-bundle/AdminPanelRoot/UserRoutes";
import { StaticBlockRoutes } from "@everyworkflow/static-block-bundle/AdminPanelRoot/StaticBlockRoutes";
import { PageRoutes } from "@everyworkflow/page-bundle/AdminPanelRoot/PageRoutes";

import { ScopeRoutes } from "@everyworkflow/scope-bundle/AdminPanelRoot/ScopeRoutes";
import { MenuRoutes } from "@everyworkflow/menu-bundle/AdminPanelRoot/MenuRoutes";
import { AuthRoutes } from "@everyworkflow/auth-bundle/AdminPanelRoot/AuthRoutes";
import { SettingRoutes } from "@everyworkflow/setting-bundle/AdminPanelRoot/SettingRoutes";

// /* CRM */
import { CustomerRoutes } from "@everyworkflow/customer-bundle/AdminPanelRoot/CustomerRoutes";

// /* PIM */
import { CatalogCategoryRoutes } from "@everyworkflow/catalog-category-bundle/AdminPanelRoot/CatalogCategoryRoutes";
import { CatalogProductRoutes } from "@everyworkflow/catalog-product-bundle/AdminPanelRoot/CatalogProductRoutes";

// /* Ecommerce */
import { SalesOrderRoutes } from "@everyworkflow/sales-order-bundle/AdminPanelRoot/SalesOrderRoutes";

export const RouteMaps = [
    AdminPanelRoutes,
    ExampleRoutes,
    MediaManagerRoutes,
    StaticBlockRoutes,
    EavRoutes,
    UserRoutes,
    PageRoutes,

    ScopeRoutes,
    AuthRoutes,
    MenuRoutes,
    SettingRoutes,

    /* CRM */
    CustomerRoutes,

    /* PIM */
    CatalogCategoryRoutes,
    CatalogProductRoutes,

    /* Ecommerce */
    SalesOrderRoutes,
];
