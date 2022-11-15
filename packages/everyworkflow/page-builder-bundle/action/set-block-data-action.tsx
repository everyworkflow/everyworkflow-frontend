/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/model/page-builder-state-interface";
import { ACTION_SET_BLOCK_DATA } from "@everyworkflow/page-builder-bundle/reducer/page-builder-reducer";

const SetBlockDataAction = (blockData: Array<BlockInterface>) => {
    return (state: PageBuilderStateInterface, dispatch: any) => {
        dispatch({ type: ACTION_SET_BLOCK_DATA, payload: blockData });
        state.block_data_emit(blockData);
    };
}

export default SetBlockDataAction;
