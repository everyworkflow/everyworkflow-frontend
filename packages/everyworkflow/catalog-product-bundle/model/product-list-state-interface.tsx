/*
 * @copyright EveryWorkflow. All rights reserved.
 */

interface ProductListStateInterface {
    products: any;
    menu: any;
    isLoading: boolean;
    filters: { price: any; brand: any; size: string; color: string };
}

export default ProductListStateInterface;
