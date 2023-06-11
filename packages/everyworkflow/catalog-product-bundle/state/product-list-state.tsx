/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ProductListStateInterface from "@everyworkflow/catalog-product-bundle/model/product-list-state-interface";

export const productListState: ProductListStateInterface = {
    data_collection: undefined,
    child_category: undefined,
    filter_attributes: [],
    pagination: { page: 1, per_page: 24 },
    filter: undefined,

    products: [],
    menu: [],
    isLoading: true,
    filters: undefined,
};
