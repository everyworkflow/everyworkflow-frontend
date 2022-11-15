/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import PageBuilderStateInterface from "@everyworkflow/page-builder-bundle/model/page-builder-state-interface";
import {
    ACTION_SET_BLOCK_DATA,
    ACTION_SET_BLOCK_DRAGGING
} from "@everyworkflow/page-builder-bundle/reducer/page-builder-reducer";

export const DROP_TYPE_BEFORE = 'before'; //default
export const DROP_TYPE_AFTER = 'after';
export const DROP_TYPE_INSIDE = 'inside';

interface DropBlockActionProps {
    fromIndexes: Array<number>;
    toIndexes: Array<number>;
    dropType?: string;
}

const DropBlockAction = ({ fromIndexes, toIndexes, dropType = DROP_TYPE_BEFORE }: DropBlockActionProps) => {
    let dropdableBlockData: any = undefined;
    const generateDropableBlockDataByIndexes = (data: Array<BlockInterface>, level = 0): Array<BlockInterface> => {
        if (Array.isArray(fromIndexes) && fromIndexes[level] !== undefined && data[fromIndexes[level]]) {
            const currentIndex = fromIndexes[level];
            const currentBlock: any = { ...data[currentIndex] };
            if (currentBlock.hasOwnProperty('block_data')) {
                currentBlock['block_data'] = generateDropableBlockDataByIndexes(currentBlock['block_data'], level + 1);
            }
            data[currentIndex] = currentBlock;
            if (fromIndexes.length === (level + 1)) {
                dropdableBlockData = { ...currentBlock };
                data.splice(currentIndex, 1);
            }
        }
        return data;
    }

    const getUpdatedDataByIndexes = (data: Array<BlockInterface>, level = 0): Array<BlockInterface> => {
        if (!Array.isArray(toIndexes)) {
            return data;
        }
        if (toIndexes.length === 0 && dropdableBlockData) {
            data.push(dropdableBlockData);
            return data;
        }
        if (toIndexes.length && toIndexes[level] !== undefined) {
            let currentIndex = toIndexes[level];
            if (fromIndexes.length === (level + 1) && fromIndexes[level] <= toIndexes[level] &&
                toIndexes.slice(0, level).join('-') === fromIndexes.slice(0, level).join('-')) {
                currentIndex = currentIndex - 1;
            }
            if (currentIndex < 0 && dropdableBlockData) {
                data.unshift(dropdableBlockData);
                return data;
            }
            if (data[currentIndex] && dropdableBlockData) {
                const currentBlock: any = { ...data[currentIndex] };
                if (toIndexes.length === (level + 1)) {
                    if (dropType === DROP_TYPE_BEFORE) {
                        const beforeRemoveData = data.splice(0, currentIndex);
                        data = [
                            ...beforeRemoveData,
                            ...[{ ...dropdableBlockData }],
                            ...data,
                        ];
                    } else if (dropType === DROP_TYPE_AFTER) {
                        const beforeRemoveData = data.splice(0, currentIndex + 1);
                        const afterRemoveData = data.splice(currentIndex + 1);
                        data = [
                            ...beforeRemoveData,
                            ...[{ ...dropdableBlockData }],
                            ...afterRemoveData,
                        ];
                    } else if (dropType === DROP_TYPE_INSIDE) {
                        if (currentBlock.hasOwnProperty('block_data')) {
                            currentBlock['block_data'].push(dropdableBlockData);
                            data[currentIndex] = currentBlock;
                        }
                    }
                } else if (currentBlock.hasOwnProperty('block_data')) {
                    currentBlock['block_data'] = getUpdatedDataByIndexes(currentBlock['block_data'], level + 1);
                    data[currentIndex] = currentBlock;
                }
            }
        }
        return data;
    }

    return (state: PageBuilderStateInterface, dispatch: any) => {
        let updatedData: Array<BlockInterface> = generateDropableBlockDataByIndexes(state.block_data);
        dispatch({ type: ACTION_SET_BLOCK_DATA, payload: [] });
        updatedData = getUpdatedDataByIndexes(updatedData);
        dispatch({ type: ACTION_SET_BLOCK_DATA, payload: updatedData });
        dispatch({ type: ACTION_SET_BLOCK_DRAGGING, payload: undefined });
        state.block_data_emit(updatedData);
    };
}

export default DropBlockAction;
