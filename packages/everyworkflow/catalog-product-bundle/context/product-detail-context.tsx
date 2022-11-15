/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from "react";
import ProductDetailStateInterface from "@everyworkflow/catalog-product-bundle/model/product-detail-state-interface";
import { productDetailState } from "@everyworkflow/catalog-product-bundle/state/product-detail-state";

export interface ProductDetailContextInterface {
    state: ProductDetailStateInterface;
    dispatch: any;
}

const ProductDetailContext = createContext<ProductDetailContextInterface>({
    state: productDetailState,
    dispatch: () => null,
});

export default ProductDetailContext;
