/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ProductDetailComponent from '@everyworkflow/catalog-product-bundle/component/product-detail-component';

const ProductDetailPage = () => {
    const remoteProductData: any = {
        "item": {
            "id": 1,
            "product_name": "Orange Women T-Shirt",
            "short_description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
            "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
            "price": 100,
            "special_price": 95,
            "price_formatted": "$100.00",
            "price_old_formatted": "$150.00",
            "quantity": 95,
            "color": "yellow",
            "image": "/media/test-product-images/ws12-orange_main_2.jpg",
            "condition": "Fresh",
            "brand": "Calvin Klein",
            "size": "small",
            "category": [
                1330,
                1333,
                1339
            ],
            "gallery": [
                {
                    "media_type": "image",
                    "title": "Orange image",
                    "path_name": "/media/test-product-images/ws12-orange_main_2.jpg",
                    "types": [
                        "image",
                        "small_image",
                        "thumbnail"
                    ]
                },
                {
                    "media_type": "image",
                    "title": "White image",
                    "path_name": "/media/test-product-images/wt09-white_main_1.jpg",
                    "types": []
                }
            ]
        }
    };

    return (
        <div className="container">
            <ProductDetailComponent
                initialState={{
                    remote_data: remoteProductData
                }}
            />
        </div>
    );
}

export default ProductDetailPage;
