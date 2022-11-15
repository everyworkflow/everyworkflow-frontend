/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormPageComponent from '@everyworkflow/data-form-bundle/component/data-form-page-component';

const EntityFormPage = () => {
    return (
        <DataFormPageComponent
            title="Entity"
            getPath="/eav/entity/{code}"
            savePath="/eav/entity/{code}"
            primaryKey="code"
            primaryKeyLabel="Code"
        />
    );
};

export default EntityFormPage;
