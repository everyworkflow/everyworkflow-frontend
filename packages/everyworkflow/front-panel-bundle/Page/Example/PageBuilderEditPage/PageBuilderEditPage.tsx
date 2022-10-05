/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import PageBuilderComponent from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";
import { PageBuilderEditData } from "@everyworkflow/front-panel-bundle/Page/Example/PageBuilderEditPage/pageBuilderEditData";

const PageBuilderEditPage = () => {
    return <PageBuilderComponent pageBuilderData={PageBuilderEditData} mode={MODE_EDIT} />;
}

export default PageBuilderEditPage;
