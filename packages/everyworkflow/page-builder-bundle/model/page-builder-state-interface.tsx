/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import BlockFormInterface from "@everyworkflow/page-builder-bundle/model/block-form-interface";

interface PageBuilderStateInterface {
    block_data: Array<BlockInterface>;
    block_form_data?: Array<BlockFormInterface>;
    mode: string;
    block_dragging?: Array<any>;
    block_data_emit: (blockData: Array<BlockInterface>) => void;
}

export default PageBuilderStateInterface;
