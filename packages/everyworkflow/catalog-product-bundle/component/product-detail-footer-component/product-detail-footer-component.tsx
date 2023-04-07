/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Tabs } from 'antd';
import ProductDetailContext from '@everyworkflow/catalog-product-bundle/context/product-detail-context';

const ProductDetailFooterComponent = () => {
    const { state: detailState } = useContext(ProductDetailContext);

    return (
        <div style={{ maxWidth: 992, margin: 'auto', paddingTop: 26, paddingBottom: 26 }}>
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'Description',
                    children: (
                        <div dangerouslySetInnerHTML={{ __html: detailState.remote_data?.item?.description }} />
                    ),
                },
                {
                    key: '2',
                    label: 'Additional Information',
                    children: (
                        <p>Tab 2</p>
                    ),
                },
                {
                    key: '3',
                    label: 'Reviews',
                    children: (
                        <p>Tab 3</p>
                    ),
                },
            ]}
            />
        </div>
    );
}

export default ProductDetailFooterComponent;
