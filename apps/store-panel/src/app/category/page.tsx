/*
 * @copyright EveryWorkflow. All rights reserved.
 */

"use client";

import ProductListingComponent from "@everyworkflow/catalog-product-bundle/component/product-listing-component";
import {
  ProductListContext,
  useProductListContext,
} from "@everyworkflow/catalog-product-bundle/context/product-list-context";
import UrlHelper from "@everyworkflow/panel-bundle/helper/url-helper";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import Head from "next/head";
import { useParams } from "next/navigation";

const getCategoryData = async (routeQuery: any) => {
  const page = routeQuery?.page ?? 1;
  let perPage = 24;
  if (routeQuery["per-page"] && Number(routeQuery["per-page"]) > 24) {
    perPage = Number(routeQuery["per-page"]);
  }
  let filter: any = {};
  try {
    filter = JSON.parse(routeQuery?.filter ?? {});
  } catch (err) {}
  const fullUrlPath = UrlHelper.buildApiUrl("/catalog/search");
  const url = new URL(fullUrlPath);
  url.searchParams.set("page", page);
  url.searchParams.set("per-page", perPage.toString());
  url.searchParams.set("filter", JSON.stringify(filter));
  console.log("API---URL--->", url.toString());
  const response = await Remote.get(url.toString());
  return { response, pagination: { page, per_page: perPage }, filter };
};

const Page = async () => {
  const { state, dispatch } = useProductListContext();
  const params = useParams();
  const { response, pagination, filter } = await getCategoryData(params);

  return (
    <>
      <Head>
        <title>Category - EveryWorkflow</title>
      </Head>
      <ProductListContext.Provider
        value={{
          state: {
            ...state,
            ...response,
            pagination: pagination,
            filter: filter,
            isLoading: false,
          },
          dispatch,
        }}
      >
        <ProductListingComponent />
      </ProductListContext.Provider>
    </>
  );
};

export default Page;
