/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PageBuilderComponent from "@everyworkflow/page-builder-bundle/component/page-builder-component";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";
import { PageBuilderEditData } from "@everyworkflow/front-panel-bundle/page/example/page-builder-edit-page/page-builder-edit-data";

const PageBuilderEditPage = () => {
    return <PageBuilderComponent pageBuilderData={PageBuilderEditData} mode={MODE_EDIT} />;
}

export default PageBuilderEditPage;
