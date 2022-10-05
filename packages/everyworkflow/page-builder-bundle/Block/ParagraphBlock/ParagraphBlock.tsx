/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Typography from "antd/lib/typography";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import ParagraphBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/ParagraphBlockInterface";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";

interface ParagraphBlockProps {
    indexes?: Array<number>;
    blockData: ParagraphBlockInterface;
    mode?: string;
}

const ParagraphBlock = ({ indexes, blockData, mode }: ParagraphBlockProps) => {
    const renderBlockContent = () => (
        <Typography.Paragraph style={StyleHelper.remoteStyleParse(blockData.style)}>
            {blockData.content}
        </Typography.Paragraph>
    )

    return (
        <>
            {mode === MODE_EDIT ? (
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    {renderBlockContent()}
                </EditableBlockComponent>
            ) : renderBlockContent()}
        </>
    );
}

export default ParagraphBlock;
