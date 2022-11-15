/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { AdminPanelRoutes } from "@everyworkflow/admin-panel-bundle/admin-panel-root/admin-panel-routes";
import { ExampleRoutes } from "@everyworkflow/admin-panel-bundle/admin-panel-root/example-routes";
import { MediaManagerRoutes } from "@everyworkflow/media-manager-bundle/admin-panel-root/media-manager-routes";
import { EavRoutes } from "@everyworkflow/eav-bundle/admin-panel-root/eav-routes";
import { UserRoutes } from "@everyworkflow/user-bundle/admin-panel-root/user-routes";
import { StaticBlockRoutes } from "@everyworkflow/static-block-bundle/admin-panel-root/static-block-routes";
import { PageRoutes } from "@everyworkflow/page-bundle/admin-panel-root/page-routes";

import { ScopeRoutes } from "@everyworkflow/scope-bundle/admin-panel-root/scope-routes";
import { MenuRoutes } from "@everyworkflow/menu-bundle/admin-panel-root/menu-routes";
import { AuthRoutes } from "@everyworkflow/auth-bundle/admin-panel-root/auth-routes";
import { SettingRoutes } from "@everyworkflow/setting-bundle/admin-panel-root/setting-routes";

// /* CRM */
import { CustomerRoutes } from "@everyworkflow/customer-bundle/admin-panel-root/customer-routes";

// /* PIM */
import { CatalogCategoryRoutes } from "@everyworkflow/catalog-category-bundle/admin-panel-root/catalog-category-routes";
import { CatalogProductRoutes } from "@everyworkflow/catalog-product-bundle/admin-panel-root/catalog-product-routes";

// /* Ecommerce */
import { SalesOrderRoutes } from "@everyworkflow/sales-order-bundle/admin-panel-root/sales-order-routes";

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
