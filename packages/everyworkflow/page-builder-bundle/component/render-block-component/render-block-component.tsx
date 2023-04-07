/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import { PageBlockMaps } from "@everyworkflow/page-builder-bundle/root/page-block-maps";

interface RenderBlockComponentProps {
    indexes?: Array<number>,
    blockData?: BlockInterface;
    mode?: string;
}

const RenderBlockComponent = ({ indexes, blockData, mode }: RenderBlockComponentProps) => {
    if (blockData?.block_type && PageBlockMaps.hasOwnProperty(blockData.block_type)) {
        const DynamicBlock = PageBlockMaps[blockData.block_type];
        return <DynamicBlock indexes={indexes ?? []} blockData={blockData} mode={mode} />;
    }

    return <p>Block with type "{blockData?.block_type}" not found - 1!</p>;
}

export default RenderBlockComponent;
 