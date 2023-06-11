/*
 * @copyright EveryWorkflow. All rights reserved.
 */

'use client';

import ProductDetailComponent from "@everyworkflow/catalog-product-bundle/component/product-detail-component";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import Head from 'next/head';

interface PageProps {
    params: {
        slug: string;
    }
}

const Page = async ({ params }: PageProps) => {
    const response = await Remote.get('/catalog/product/' + params.slug);
    console.log('pdp - response -->', response);

    return (
        <>
            <Head>
                <title>{response?.item?.name ?? 'Product'} - EveryWorkflow</title>
            </Head>
            {response?.item && (
                <ProductDetailComponent initialState={{
                    remote_data: response
                }} />
            )}
        </>
    );
};

export default Page;
