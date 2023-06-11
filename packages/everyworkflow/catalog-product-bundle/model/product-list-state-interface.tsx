/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface ProductListStateInterface {
    data_collection?: any;
    child_category?: any;
    filter_attributes?: Array<any>;
    pagination: { page: number, per_page: number };
    filter?: any;

    products: any;
    menu: any;
    isLoading: boolean;
    filters?: any;
}

export default ProductListStateInterface;
