/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback } from 'react';
import Typography from "antd/lib/typography";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import HeadingBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/HeadingBlockInterface";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";

interface HeadingBlockProps {
    indexes?: Array<number>;
    blockData: HeadingBlockInterface;
    mode?: string;
}

const HeadingBlock = ({ indexes, blockData, mode }: HeadingBlockProps) => {
    const headingLevel: any = {
        h1: 1,
        h2: 2,
        h3: 3,
        h4: 4,
        h5: 5,
    };

    const getHeadingLevel = useCallback(() => {
        if (headingLevel.hasOwnProperty(blockData.heading_type)) {
            return headingLevel[blockData.heading_type];
        }
        return undefined;
    }, [blockData]);

    const renderBlockContent = () => (
        <Typography.Title
            className={blockData.class_name}
            style={StyleHelper.remoteStyleParse(blockData.style)}
            level={getHeadingLevel()}>
            {blockData.content}
        </Typography.Title>
    )

    return (
        <>
            {mode === MODE_EDIT ? (
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    {renderBlockContent()}
                </EditableBlockComponent>
            ) : renderBlockContent()
            }
        </>
    );
}

export default HeadingBlock;
