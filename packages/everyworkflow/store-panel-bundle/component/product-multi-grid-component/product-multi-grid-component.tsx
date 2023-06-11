import { Col, Row, Card } from "antd";
import ProductCardComponent from "@everyworkflow/catalog-product-bundle/component/product-card-component";


const ProductMultiGridComponent = () => {
  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={8}>
          <Card
            style={{ borderRadius: 2 }}
            bodyStyle={{
              padding: 0,
              margin: 0,
              flex: 1,
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
              borderRadius: 2,
              display: "flex",
            }}
          >
            <Row>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <ProductCardComponent
                    item={products1[3]}
                    showDetails={false}
                  />
                  <ProductCardComponent
                    item={products1[7]}
                    showDetails={false}
                  />
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <ProductCardComponent
                    item={products1[5]}
                    showDetails={false}
                  />
                  <ProductCardComponent
                    item={products1[6]}
                    showDetails={false}
                  />
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ borderRadius: 2 }}
            bodyStyle={{
              padding: 0,
              margin: 0,
              flex: 1,
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
              borderRadius: 2,
              overflow: "scroll",
              display: "flex",
            }}
          >
            <Row gutter={[4, 4]}>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <ProductCardComponent
                    item={products1[0]}
                    showDetails={false}
                  />
                  <ProductCardComponent
                    item={products1[1]}
                    showDetails={false}
                  />
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <ProductCardComponent
                    item={products1[2]}
                    showDetails={false}
                  />
                  <ProductCardComponent
                    item={products1[3]}
                    showDetails={false}
                  />
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            style={{ borderRadius: 2 }}
            bodyStyle={{
              padding: 0,
              margin: 0,
              flex: 1,
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.08)",
              borderRadius: 2,
              overflow: "scroll",
              display: "flex",
            }}
          >
            <Row>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <ProductCardComponent
                    item={products1[4]}
                    showDetails={false}
                  />
                  <ProductCardComponent
                    item={products1[5]}
                    showDetails={false}
                  />
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[4, 4]}>
                  <ProductCardComponent
                    item={products1[6]}
                    showDetails={false}
                  />
                  <ProductCardComponent
                    item={products1[7]}
                    showDetails={false}
                  />
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductMultiGridComponent;

const products1 = [
  {
    _id: '1',
    name: "Ham - Virginia",
    price: 590,
    url_key: '',
    gallery: [{
      path_name:
        "/images/1-3000-4t-plus-20w40-hc-tech-engine-oil-for-bikes-motul-original-imaff8z4xtq5ry6a.webp"
    }],
    category:
      "The Acme 5000 is a powerful and versatile vacuum cleaner that can handle any mess with ease. Its advanced filtration system ensures that even the smallest particles are captured, making it perfect for those with allergies or asthma. With its sleek design and user-friendly controls, the Acme 5000 is the perfect addition to any home or office.",
  },
  {
    _id: '2',
    name: "Sugar - Icing",
    price: 590,
    url_key: '',
    gallery: [{ path_name: "/images/-original-imagbwf3wvhzfh5z.webp" }],
    category:
      "Achieving the perfect look has never been easier than with our collection of beauty products. From skincare to makeup, we have everything you need to look and feel your best. Our products are made with only the highest quality ingredients, ensuring that you get the best results every time. Whether you're looking to refresh your daily routine or add a pop of color for a special occasion, we have you covered.",
  },
  {
    _id: '3',
    name: "Nut - Pecan, Halves",
    price: 590,
    url_key: '',
    gallery: [{path_name: "/images/3-30155-mcfarlane-2-5-original-imagbeyyzehpyk2m.webp"}],
    category:
      "Find the right tool for the job with our selection of high-quality tools and equipment. From hand tools to power tools, we have everything you need to get the job done quickly and efficiently. Our products are made with only the highest quality materials, ensuring that they will last for years to come. Whether you're a professional contractor or a DIY enthusiast, we have the tools you need to tackle any project.",
  },
  {
    _id: '4',
    name: "Chocolate - Dark Callets",
    price: 590,
    url_key: '',
    gallery: [{path_name:
      "/images/1-3000-4t-plus-20w40-hc-tech-engine-oil-for-bikes-motul-original-imaff8z4xtq5ry6a.webp"}],
    category:
      "Get ready to look your best with our collection of stylish and comfortable clothing. From casual wear to formal attire, we have everything you need to stay on-trend and comfortable all day long. Our clothing is made with only the highest quality materials, ensuring that you get the best fit and durability every time. Whether you're looking for a new outfit for work or a special occasion, we have you covered.",
  },
  {
    _id: '5',
    name: "Scallop - St. Jaques",
    price: 590,
    url_key: '',
    gallery: [{path_name: "/images/mb02-gray-0.jpg"}],
    category: "Industrial",
  },
  {
    _id: '6',
    name: "Bar Mix - Pina Colada, 355 Ml",
    price: 590,
    url_key: '',
    gallery: [{path_name: "/images/mt07-gray_main_1.jpg"}],
    category: "Tools",
  },
  {
    _id: '7',
    name: "Water - Aquafina Vitamin",
    price: 590,
    url_key: '',
    gallery: [{path_name:
      "/images/21-sara-s-favorite-sensational-liquid-matte-pack-of-3-touch-of-original-imag4kgnbmynydnw.webp"}],
    category: "Books",
  },
  {
    _id: '8',
    name: "Cut Wakame",
    price: '90',
    url_key: '',
    gallery: [{ path_name: "/images/ws12-orange_main_2.jpg" }],
    category: "Kids",
  },
];
