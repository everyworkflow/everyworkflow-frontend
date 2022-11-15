/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ProductListStateInterface from "@everyworkflow/catalog-product-bundle/model/product-list-state-interface";

export const productListState: ProductListStateInterface = {
    products: [],
    menu: [],
    isLoading: true,
    filters: { price: [], brand: [], size: "", color: "" },
};
