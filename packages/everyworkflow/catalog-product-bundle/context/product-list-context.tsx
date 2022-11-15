/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext, useReducer } from "react";
import ProductListStateInterface from "@everyworkflow/catalog-product-bundle/model/product-list-state-interface";
import { productListState } from "@everyworkflow/catalog-product-bundle/state/product-list-state";
import ProductListReducer from "@everyworkflow/catalog-product-bundle/reducer/product-list-reducer";

export interface ProductListContextInterface {
    state: ProductListStateInterface;
    dispatch: any;
}

const ProductListContext = createContext<ProductListContextInterface>({
    state: productListState,
    dispatch: () => null,
});

const useProductListContext = () => {
    const [state, dispatch] = useReducer(ProductListReducer, productListState);
    return { state, dispatch };
};

export { ProductListContext, useProductListContext };
