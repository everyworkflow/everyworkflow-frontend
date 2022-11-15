import { useEffect } from "react";
import ProductListingComponent from "@everyworkflow/catalog-product-bundle/component/product-listing-component";
import {
    ProductListContext,
    useProductListContext,
} from "@everyworkflow/catalog-product-bundle/context/product-list-context";

const Products = (props: any) => {
    const { state, dispatch } = useProductListContext();

    useEffect(() => {
        //  dispatch({
        //    type: ACTION_SET_PRODUCT_DATA,
        //    payload: {
        //      products:
        //      menu:
        //    },
        //  });
    }, []);
    return (
        <ProductListContext.Provider value={{ state, dispatch }}>
            <ProductListingComponent />
        </ProductListContext.Provider>
    );
};

export async function getServerSideProps(context: any) {
    // const data: any = [];
    // // await Promise.all([
    // //   // fetch("../api/productList"),
    // //   // fetch("../api/product-side-menu"),
    // // ]);

    // const products = data[0].json();
    // const menu = data[1].json();

    return {
        props: { products: [], menu: [] },
    };
}

export default Products;
