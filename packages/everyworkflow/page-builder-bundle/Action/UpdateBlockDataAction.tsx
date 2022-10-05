/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/Model/PageBuilderStateInterface";
import {ACTION_SET_BLOCK_DATA} from "@everyworkflow/page-builder-bundle/Reducer/PageBuilderReducer";

interface UpdateBlockDataActionProps {
    indexes?: Array<number>;
    updateData: any;
}

const UpdateBlockDataAction = ({indexes, updateData}: UpdateBlockDataActionProps) => {
    const getUpdatedDataByIndexes = (data: Array<BlockInterface>, level = 0): Array<BlockInterface> => {
        if (Array.isArray(indexes) && indexes[level] !== undefined && data[indexes[level]]) {
            const currentBlock: any = data[indexes[level]];
            if (indexes.length === (level + 1)) {
                Object.keys(updateData).forEach(key => {
                    // New nodes from updateData are added directly
                    if (key !== 'block_data') {
                        currentBlock[key] = updateData[key];
                    }
                });
            }
            if (currentBlock.hasOwnProperty('block_data')) {
                currentBlock['block_data'] = getUpdatedDataByIndexes(currentBlock['block_data'], level + 1);
            }
            data[indexes[level]] = currentBlock;
        }
        return data;
    }

    return (state: PageBuilderStateInterface, dispatch: any) => {
        const updatedData: any = getUpdatedDataByIndexes(state.block_data);
        console.log('UpdateBlockDataAction -->', {
            indexes: indexes,
            updateData: updateData,
            updatedData: updatedData,
        });
        dispatch({type: ACTION_SET_BLOCK_DATA, payload: updatedData});
    };
}

export default UpdateBlockDataAction;
