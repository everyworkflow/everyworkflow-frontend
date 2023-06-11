/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { theme, Col, Row, Pagination, Card, Space } from "antd";
import { ProductListContext } from "@everyworkflow/catalog-product-bundle/context/product-list-context";
import ProductCardComponent from "@everyworkflow/catalog-product-bundle/component/product-card-component";
import ProductListingSidebar from "@everyworkflow/catalog-product-bundle/component/product-listing-component/product-listing-sidebar";

const ProductListingComponent = () => {
  const { state } = useContext(ProductListContext);
  const { token } = theme.useToken();
  const params = useSearchParams();
  const query = params;
  const filter = query.get("filter");

  const router = useRouter();

  return (
    <div className="container">
      {state.isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: token.padding,
            backgroundColor: token.colorBgContainer,
            alignItems: "flex-start",
          }}
        >
          <Card
            style={{
              width: 320,
              backgroundColor: token.colorBgBase,
            }}
            bordered={false}
          >
            <ProductListingSidebar />
          </Card>
          <div style={{ width: 20 }} />
          <Card style={{ backgroundColor: token.colorBgBase, width: "100%" }}>
            {state.data_collection && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "15px",
                    justifyItems: "center",
                    width: "100%",
                  }}
                >
                  {state.data_collection.results?.map(
                    (item: any, index: number) => (
                      <ProductCardComponent
                        key={item.id}
                        item={item}
                        showCategory={false}
                        showButton={true}
                      />
                    )
                  )}
                </div>
                <div
                  style={{
                    paddingTop: token.padding * 2,
                    textAlign: "center",
                  }}
                >
                  <Pagination
                    showQuickJumper
                    current={state.data_collection?.meta?.current_page ?? 0}
                    pageSize={state.data_collection?.meta?.per_page ?? 0}
                    pageSizeOptions={[25, 50, 100, 200]}
                    total={state.data_collection?.meta?.total_count ?? 0}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    onChange={(page: number, pageSize: number) => {
                      if (typeof window !== "undefined") {
                        const routeQuery: any = filter ?? {};
                        const url = new URL(window?.location?.toString());
                        Object.keys(routeQuery).forEach((key) => {
                          url.searchParams.set(key, routeQuery[key]);
                        });
                        url.searchParams.set("page", page.toString());
                        url.searchParams.set("per-page", pageSize.toString());
                        router.push(url.toString());
                      }
                    }}
                  />
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductListingComponent;
