/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/Model/PageBuilderStateInterface";
import {ACTION_SET_BLOCK_DATA} from "@everyworkflow/page-builder-bundle/Reducer/PageBuilderReducer";
import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";

const DuplicateBlockAction = (indexes: Array<number>) => {
    const getUpdatedDataByIndexes = (data: Array<BlockInterface>, level = 0): Array<BlockInterface> => {
        if (Array.isArray(indexes) && indexes[level] !== undefined && data[indexes[level]]) {
            const currentIndex = indexes[level];
            const currentBlock: any = {...data[currentIndex]};
            if (currentBlock.hasOwnProperty('block_data')) {
                currentBlock['block_data'] = getUpdatedDataByIndexes(currentBlock['block_data'], level + 1);
            }
            data[currentIndex] = currentBlock;
            if (indexes.length === (level + 1)) {
                data = [
                    ...[...data].splice(0, currentIndex + 1),
                    ...[{...currentBlock}],
                    ...[...data].splice(currentIndex + 1, data.length - currentIndex),
                ];
            }
        }
        return data;
    }

    return (state: PageBuilderStateInterface, dispatch: any) => {
        const updatedData: any = getUpdatedDataByIndexes(state.block_data);
        console.log('UpdateBlockDataAction -->', {
            indexes: indexes,
            updatedData: updatedData,
        });
        dispatch({type: ACTION_SET_BLOCK_DATA, payload: updatedData});
    };
}

export default DuplicateBlockAction;
