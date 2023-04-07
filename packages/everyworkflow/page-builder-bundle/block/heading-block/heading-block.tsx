/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState, useEffect } from 'react';
import { Typography } from "antd";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import HeadingBlockInterface from "@everyworkflow/page-builder-bundle/model/block/heading-block-interface";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";

interface HeadingBlockProps {
    indexes?: Array<number>;
    blockData: HeadingBlockInterface;
    mode?: string;
}

const HeadingBlock = ({ indexes, blockData, mode }: HeadingBlockProps) => {
    const [headingLevel, setHeadingLevel] = useState<1 | 2 | 3 | 4 | 5 | undefined>(undefined);

    useEffect(() => {
        const mapData: any = {
            h1: 1,
            h2: 2,
            h3: 3,
            h4: 4,
            h5: 5,
        };
        if (mapData.hasOwnProperty(blockData.heading_type)) {
            setHeadingLevel(mapData[blockData.heading_type]);
        } else {
            setHeadingLevel(undefined);
        }
    }, [blockData]);

    return (
        <>
            <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                <Typography.Title
                    className={blockData.class_name}
                    style={StyleHelper.remoteStyleParse(blockData.use_style)}
                    level={headingLevel}>
                    {blockData.content}
                </Typography.Title>
            </BlockWrapperComponent>
        </>
    );
}

export default HeadingBlock;
