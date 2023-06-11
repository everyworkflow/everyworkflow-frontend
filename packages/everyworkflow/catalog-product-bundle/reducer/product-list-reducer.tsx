/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ProductListStateInterface from "@everyworkflow/catalog-product-bundle/model/product-list-state-interface";
import {
    ACTION_SET_PRODUCT_DATA,
    ACTION_SET_PRODUCT_FILTER,
} from "@everyworkflow/catalog-product-bundle/constant/reducer/product-list-constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let BASE_URI = "https://ew.dreamworkfactory.com";

const getRouteParams = (filter: any) => {
    let params: any = [];
    Object.entries(filter).forEach(
        (item: any) => item[1].length && params.push(item[0] + "=" + item[1])
    );
    return params.join("&");
};

const ProductListReducer = (state: ProductListStateInterface, action: any) => {
    switch (action.type) {
        case ACTION_SET_PRODUCT_DATA: {
            const products = action.payload.products.data;
            const menu = action.payload.menu.data;
            const index = menu.findIndex((item: any) => item.key === "category");
            const category = menu[index].items.map((item: any) => {
                let newItem: any = {
                    ...item,
                };
                if (item.icon) {
                    newItem["icon"] = <FontAwesomeIcon icon={item.icon} />;
                }
                return newItem;
            });
            menu[index].items = category;
            const getPriceRange = products.map((item: any) => item.price);
            const price = [Math.min(...getPriceRange), Math.max(...getPriceRange)];
            return {
                ...state,
                products,
                menu,
                filters: { ...state.filters, price },
                isLoading: false,
            };
        }
        case ACTION_SET_PRODUCT_FILTER: {
            // const { key, value } = action.payload;

            // let finalValue: any;
            // if (key === "brand") {
            //     finalValue = state.filters.brand.includes(value)
            //         ? state.filters.brand.filter((item: any) => item !== value)
            //         : [...state.filters.brand, value];
            // } else {
            //     finalValue = value;
            // }
            // const filter = {
            //     ...state,
            //     filters: { ...state.filters, [key]: finalValue },
            // };
            // const URI = `${BASE_URI}/product/filter?${getRouteParams(
            //     filter.filters
            // )};`;

            console.log('dispatch -->', action);
            return {
                ...state,
                filters: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default ProductListReducer;
