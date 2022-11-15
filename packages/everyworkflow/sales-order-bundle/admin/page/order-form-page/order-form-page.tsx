/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

const OrderFormPage = () => {
    return (
        <DataFormPageComponent
            title="Order"
            getPath="/sales/order/{uuid}"
            savePath="/sales/order/{uuid}"
        />
    );
};

export default OrderFormPage;
