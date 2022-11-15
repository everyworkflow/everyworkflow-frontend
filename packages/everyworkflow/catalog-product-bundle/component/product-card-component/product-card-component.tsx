/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Card from 'antd/lib/card';
import Image from 'antd/lib/image';

const ProductCardComponent = ({ item }: { item: any }) => (
    <Card
        hoverable
        style={{ width: 240, margin: 20 }}
        cover={<Image src={item.image} alt={'Img'} />}
    >
        {item.condition && (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#877f64",
                    padding: "2px 10px 2px 10px",
                    margin: "5px 0px 0px 10px",
                    borderRadius: 4,
                }}
            >
                <p style={{ color: "white", margin: 0 }}>{item.condition}</p>
            </div>
        )}
        <Card.Meta title={item.product_name} description={`$${item.price}`} />
    </Card>
);

export default ProductCardComponent;
