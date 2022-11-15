/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

const CustomerFormPage = () => {
    return (
        <DataFormPageComponent
            title="Customer"
            getPath="/customer/{uuid}"
            savePath="/customer/{uuid}"
        />
    );
};

export default CustomerFormPage;
