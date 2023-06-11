import { useState, useEffect } from "react";
import { Card, theme } from "antd";
import ProductCardComponent from "@everyworkflow/catalog-product-bundle/component/product-card-component";
import getMockProducts from "../../services/product-service";
import "./index.css";

const ProductGridComponent = () => {
  const { token } = theme.useToken();

  const [state, setState] = useState<any>([]);

  useEffect(() => {
    getMockProducts(10).then((data: any) => {
      setState(data);
    });
  }, []);
  return (
    <Card
      style={{ borderRadius: 2 }}
      bodyStyle={{
        width: "100%",
        margin: 0,
        boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
        borderRadius: 2,
        backgroundColor: token.colorBgBase,
      }}
    >
      <div className="grid">
        {state.map((item: any) => {
          return <ProductCardComponent key={item.id} item={item} showButton />;
        })}
      </div>
    </Card>
  );
};

export default ProductGridComponent;
