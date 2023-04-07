/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Typography } from "antd";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import ParagraphBlockInterface from "@everyworkflow/page-builder-bundle/model/block/paragraph-block-interface";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";

interface ParagraphBlockProps {
    indexes?: Array<number>;
    blockData: ParagraphBlockInterface;
    mode?: string;
}

const ParagraphBlock = ({ indexes, blockData, mode }: ParagraphBlockProps) => {
    return (
        <>
            <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                <Typography.Paragraph style={StyleHelper.remoteStyleParse(blockData.style)}>
                    {blockData.content}
                </Typography.Paragraph>
            </BlockWrapperComponent>
        </>
    );
}

export default ParagraphBlock;
