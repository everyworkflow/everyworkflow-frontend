/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import BlockFormInterface from "@everyworkflow/page-builder-bundle/model/block-form-interface";

interface PageBuilderInterface {
    block_data: Array<BlockInterface>;
    block_form_data?: Array<BlockFormInterface>;
}

export default PageBuilderInterface;
