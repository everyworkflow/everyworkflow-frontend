/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Space, Image } from 'antd';
import ProductDetailContext from '@everyworkflow/catalog-product-bundle/context/product-detail-context';

const ProductGalleryComponent = () => {
    const { state: detailState } = useContext(ProductDetailContext);

    return (
        <Image.PreviewGroup>
            <Space direction="vertical" style={{ width: '100%' }}>
                {detailState.remote_data?.item?.gallery?.map((item: any, index: number) => (
                    <Image
                        key={index}
                        src={item.path_name}
                        alt={item.title}
                        className="app-product-main-gallery-image"
                        style={{ width: '100%', cursor: 'zoom-in' }}
                        wrapperStyle={{ width: '100%' }}
                        preview={{
                            mask: undefined,
                        }}
                    />
                ))}
            </Space>
        </Image.PreviewGroup>
    );
}

export default ProductGalleryComponent;
