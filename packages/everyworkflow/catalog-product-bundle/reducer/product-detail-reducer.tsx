/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ProductDetailStateInterface from "@everyworkflow/catalog-product-bundle/model/product-detail-state-interface";

export const ACTION_SET_CART_DATA = 'set_cart_data';

const ProductDetailReducer = (state: ProductDetailStateInterface, action: any) => {
    switch (action.type) {
        case ACTION_SET_CART_DATA: {
            return {
                ...state,
                cart_data: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ProductDetailReducer;
