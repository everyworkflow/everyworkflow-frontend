/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import BlockFormInterface from "@everyworkflow/page-builder-bundle/Model/BlockFormInterface";

interface PageBuilderInterface {
    block_data: Array<BlockInterface>;
    block_form_data?: Array<BlockFormInterface>;
}

export default PageBuilderInterface;
