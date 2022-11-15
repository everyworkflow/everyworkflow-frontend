/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/model/page-builder-state-interface";
import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";

export const pageBuilderState: PageBuilderStateInterface = {
    block_data: [],
    block_form_data: undefined,
    mode: '',
    block_dragging: undefined,
    block_data_emit: (blockData: Array<BlockInterface>) => { },
}
