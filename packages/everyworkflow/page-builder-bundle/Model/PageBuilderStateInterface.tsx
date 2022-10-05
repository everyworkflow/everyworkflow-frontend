/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import BlockFormInterface from "@everyworkflow/page-builder-bundle/Model/BlockFormInterface";

interface PageBuilderStateInterface {
    block_data: Array<BlockInterface>;
    block_form_data?: Array<BlockFormInterface>;
    mode: string;
    block_dragging?: Array<any>;
}

export default PageBuilderStateInterface;
