/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from "react";
import { Row, Slider, Space, Menu, Divider, Radio, Checkbox, Typography } from "antd";
import { ProductListContext } from "@everyworkflow/catalog-product-bundle/context/product-list-context";
import {
    ACTION_SET_PRODUCT_DATA,
    ACTION_SET_PRODUCT_FILTER,
} from "@everyworkflow/catalog-product-bundle/constant/reducer/product-list-constant";
import ProductCard from "@everyworkflow/catalog-product-bundle/component/product-card-component";

const ProductListingComponent = () => {
    const { state, dispatch } = useContext(ProductListContext);

    useEffect(() => {
        (async () => {
            try {
                dispatch({
                    type: ACTION_SET_PRODUCT_DATA,
                    payload: {
                        products: {
                            data: [
                                {
                                    "id": 1,
                                    "product_name": "Edible Flower - Mixed",
                                    "description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
                                    "price": 95,
                                    "quantity": 95,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/ws12-orange_main_2.jpg",
                                    "condition": "Fresh",
                                    "brand": "Calvin Klein",
                                    "size": "small"
                                },
                                {
                                    "id": 2,
                                    "product_name": "Soup V8 Roasted Red Pepper",
                                    "description": "Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
                                    "price": 2,
                                    "quantity": 31,
                                    "color": "red",
                                    "image": "/media/test-product-images/ws12-orange_main_2.jpg",
                                    "condition": "Out Of Stock",
                                    "brand": "Levi Strauss",
                                    "size": "small"
                                },
                                {
                                    "id": 3,
                                    "product_name": "Red Currants",
                                    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.",
                                    "price": 79,
                                    "quantity": 16,
                                    "color": "red",
                                    "image": "/media/test-product-images/ws12-orange_main_2.jpg",
                                    "condition": "Sale",
                                    "brand": "Levi Strauss",
                                    "size": "small"
                                },
                                {
                                    "id": 4,
                                    "product_name": "Soup - Campbells Chili",
                                    "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.",
                                    "price": 76,
                                    "quantity": 71,
                                    "color": "red",
                                    "image": "/media/test-product-images/ws12-orange_main_2.jpg",
                                    "brand": "Tomi Hilfiger",
                                    "size": "small"
                                },
                                {
                                    "id": 5,
                                    "product_name": "Beer - Blue Light",
                                    "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
                                    "price": 38,
                                    "quantity": 7,
                                    "color": "blue",
                                    "image": "/media/test-product-images/wb04-blue-0.jpg",
                                    "brand": "Tomi Hilfiger",
                                    "size": "small"
                                },
                                {
                                    "id": 6,
                                    "product_name": "Pork - Sausage Casing",
                                    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
                                    "price": 44,
                                    "quantity": 75,
                                    "color": "purple",
                                    "image": "/media/test-product-images/ws12-orange_main_2.jpg",
                                    "condition": "Out Of Stock",
                                    "brand": "Tomi Hilfiger",
                                    "size": "medium"
                                },
                                {
                                    "id": 7,
                                    "product_name": "Cape Capensis - Fillet",
                                    "description": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo.",
                                    "price": 10,
                                    "quantity": 73,
                                    "color": "purple",
                                    "image": "/media/test-product-images/wb04-blue-0.jpg",
                                    "condition": "Out Of Stock",
                                    "brand": "Tomi Hilfiger",
                                    "size": "medium"
                                },
                                {
                                    "id": 8,
                                    "product_name": "Bouq All Italian - Primerba",
                                    "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                                    "price": 18,
                                    "quantity": 21,
                                    "color": "red",
                                    "image": "/media/test-product-images/wt09-white_main_1.jpg",
                                    "condition": "Sale",
                                    "brand": "Tomi Hilfiger",
                                    "size": "medium"
                                },
                                {
                                    "id": 9,
                                    "product_name": "Bread - Multigrain",
                                    "description": "Nam nulla.",
                                    "price": 2,
                                    "quantity": 19,
                                    "color": "red",
                                    "image": "/media/test-product-images/wb04-blue-0.jpg",
                                    "condition": "Sale",
                                    "brand": "Tom Ford",
                                    "size": "medium"
                                },
                                {
                                    "id": 10,
                                    "product_name": "Cheese - La Sauvagine",
                                    "description": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
                                    "price": 26,
                                    "quantity": 4,
                                    "color": "red",
                                    "image": "/media/test-product-images/wb04-blue-0.jpg",
                                    "condition": "Sale",
                                    "brand": "Tomi Hilfiger",
                                    "size": "medium"
                                },
                                {
                                    "id": 11,
                                    "product_name": "Meldea Green Tea Liquor",
                                    "description": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                                    "price": 80,
                                    "quantity": 22,
                                    "color": "red",
                                    "image": "/media/test-product-images/wt09-white_main_1.jpg",
                                    "condition": "Sale",
                                    "size": "medium"
                                },
                                {
                                    "id": 12,
                                    "product_name": "Ecolab Crystal Fusion",
                                    "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
                                    "price": 87,
                                    "quantity": 37,
                                    "color": "red",
                                    "image": "/media/test-product-images/wt09-white_main_1.jpg",
                                    "condition": "Sale",
                                    "brand": "Calvin Klein",
                                    "size": "medium"
                                },
                                {
                                    "id": 13,
                                    "product_name": "Mousse - Passion Fruit",
                                    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
                                    "price": 80,
                                    "quantity": 40,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mt07-gray_main_1.jpg",
                                    "condition": "Sale",
                                    "brand": "Calvin Klein",
                                    "size": "medium"
                                },
                                {
                                    "id": 14,
                                    "product_name": "Lemon Balm - Fresh",
                                    "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
                                    "price": 76,
                                    "quantity": 100,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mb02-gray-0.jpg",
                                    "condition": "Sale",
                                    "brand": "Calvin Klein",
                                    "size": "large"
                                },
                                {
                                    "id": 15,
                                    "product_name": "Sour Puss Raspberry",
                                    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
                                    "price": 31,
                                    "quantity": 48,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mt07-gray_main_1.jpg",
                                    "condition": "Sold",
                                    "brand": "Calvin Klein",
                                    "size": "large"
                                },
                                {
                                    "id": 16,
                                    "product_name": "Beans - Green",
                                    "description": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
                                    "price": 48,
                                    "quantity": 19,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mb02-gray-0.jpg",
                                    "condition": "Sold",
                                    "brand": "Hugo Boss",
                                    "size": "large"
                                },
                                {
                                    "id": 17,
                                    "product_name": "Soup - Beef Conomme, Dry",
                                    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
                                    "price": 82,
                                    "quantity": 67,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mt07-gray_main_1.jpg",
                                    "condition": "Sold",
                                    "brand": "Hugo Boss",
                                    "size": "large"
                                },
                                {
                                    "id": 18,
                                    "product_name": "Melon - Cantaloupe",
                                    "description": "Aliquam erat volutpat.",
                                    "price": 7,
                                    "quantity": 46,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mh07-gray_main_2.jpg",
                                    "condition": "Sold",
                                    "brand": "Hugo Boss",
                                    "size": "large"
                                },
                                {
                                    "id": 19,
                                    "product_name": "Wine - Rosso Del Veronese Igt",
                                    "description": "Aenean fermentum.",
                                    "price": 44,
                                    "quantity": 69,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mt07-gray_main_1.jpg",
                                    "condition": "Fresh",
                                    "brand": "Levi Strauss",
                                    "size": "large"
                                },
                                {
                                    "id": 20,
                                    "product_name": "Wine - Chardonnay South",
                                    "description": "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
                                    "price": 97,
                                    "quantity": 89,
                                    "color": "yellow",
                                    "image": "/media/test-product-images/mh07-gray_main_2.jpg",
                                    "condition": "Fresh",
                                    "brand": "Levi Strauss",
                                    "size": "x-large"
                                }
                            ]
                        },
                        menu: {
                            data: [
                                {
                                    "id": 1,
                                    "key": "category",
                                    "name": "Category",
                                    "items": [
                                        {
                                            "key": 1,
                                            "label": "Trouser",
                                            "icon": "fa-shirt",
                                            "children": [
                                                { "key": 2, "label": "Ktm Trouser" },
                                                { "key": 3, "label": "Short Trouser" }
                                            ]
                                        },
                                        {
                                            "key": 4,
                                            "icon": "fa-shirt",
                                            "label": "Jackets",
                                            "children": [
                                                { "key": 5, "label": "Half Jackets" },
                                                { "key": 6, "label": "Fulll Jackets" }
                                            ]
                                        },
                                        {
                                            "key": 7,
                                            "icon": "fa-shirt",
                                            "label": "fa-shirt",
                                            "children": [
                                                { "key": 8, "label": "Half T-Shirts" },
                                                { "key": 9, "label": "Full T-Shirts" }
                                            ]
                                        }
                                    ]
                                },
                                { "id": 2, "key": "price", "name": "Price", "items": [] },
                                {
                                    "id": 3,
                                    "key": "brand",
                                    "name": "Brands",
                                    "items": [
                                        { "id": 1, "value": "Calvin Klein" },
                                        { "id": 2, "value": "Levi Strauss" },
                                        { "id": 3, "value": "Hugo Boss" },
                                        { "id": 4, "value": "Tomi Hilfiger" },
                                        { "id": 5, "value": "Tom Ford" }
                                    ]
                                },
                                {
                                    "id": 4,
                                    "key": "size",
                                    "name": "Size",
                                    "items": [
                                        { "id": 1, "name": "Small", "value": "small" },
                                        { "id": 2, "name": "Medium", "value": "medium" },
                                        { "id": 3, "name": "Large", "value": "large" },
                                        { "id": 4, "name": "X-Large", "value": "x-large" }
                                    ]
                                },
                                {
                                    "id": 5,
                                    "key": "color",
                                    "name": "Color",
                                    "items": [
                                        { "id": 1, "name": "Blue", "value": "blue" },
                                        { "id": 2, "name": "Red", "value": "red" },
                                        { "id": 3, "name": "Purple", "value": "purple" },
                                        { "id": 4, "name": "Yellow", "value": "yellow" }
                                    ]
                                }
                            ]
                        },
                    },
                });
            } catch (error) { }
        })();

        return () => { };
    }, []);

    const onChangeFilter = (key: string, value: any) => {
        dispatch({ type: ACTION_SET_PRODUCT_FILTER, payload: { key, value } });
    }

    return (
        <div className="container">
            {state.isLoading ? (
                <h1>Loading</h1>
            ) : (
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <div style={{ marginTop: 10, flex: 0.3 }}>
                        {state.menu.map((item: any) => {
                            return (
                                <div key={item.id}>
                                    <Typography.Title level={3}>{item.name}</Typography.Title>
                                    {item.key === "category" && (
                                        <Menu
                                            mode="inline"
                                            defaultSelectedKeys={["1"]}
                                            defaultOpenKeys={["sub1"]}
                                            style={{ borderRight: 0, marginLeft: -20 }}
                                            items={item.items}
                                        />
                                    )}
                                    {item.key === "price" && (
                                        <Slider
                                            range
                                            value={state.filters.price}
                                            onChange={(value) => onChangeFilter("price", value)}
                                        />
                                    )}
                                    {item.key === "brand" &&
                                        item.items.map((item: any) => (
                                            <Row key={item.id}>
                                                <Checkbox
                                                    onChange={() => onChangeFilter("brand", item.value)}
                                                />
                                                <div style={{ marginLeft: 5 }} />
                                                <Typography.Title level={5}>{item.value}</Typography.Title>
                                            </Row>
                                        ))}
                                    {item.key === "size" && (
                                        <Radio.Group
                                            onChange={(item) => {
                                                onChangeFilter("size", item.target.value);
                                            }}
                                            value={state.filters.size}
                                        >
                                            <Space direction="vertical">
                                                {item.items.map((item: any) => (
                                                    <Radio value={item.value} key={item.id}>
                                                        {item.name}
                                                    </Radio>
                                                ))}
                                            </Space>
                                        </Radio.Group>
                                    )}
                                    {item.key === "color" && (
                                        <Radio.Group
                                            onChange={(item) =>
                                                onChangeFilter("color", item.target.value)
                                            }
                                            value={state.filters.color}
                                        >
                                            <Space direction="vertical">
                                                {item.items.map((item: any) => (
                                                    <Radio value={item.value} key={item.id}>
                                                        {item.name}
                                                    </Radio>
                                                ))}
                                            </Space>
                                        </Radio.Group>
                                    )}
                                    <Divider />
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 10, flex: 1 }}>
                        <Row justify="center">
                            {state.products?.map((item: any) => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListingComponent;
