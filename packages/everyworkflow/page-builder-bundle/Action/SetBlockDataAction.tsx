/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import {ACTION_SET_BLOCK_DATA} from "@everyworkflow/page-builder-bundle/Reducer/PageBuilderReducer";

const SetBlockDataAction = (blockData: Array<BlockInterface>) => {
    return (dispatch: any) => {
        dispatch({type: ACTION_SET_BLOCK_DATA, payload: blockData});
    };
}

export default SetBlockDataAction;
