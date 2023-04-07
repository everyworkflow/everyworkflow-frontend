/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import { Col } from "antd";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/component/render-block-component";
import ColBlockInterface from "@everyworkflow/page-builder-bundle/model/block/col-block-interface";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/component/add-block-in-page-component";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/component/drop-block-component";

interface ColBlockProps {
    indexes?: Array<number>;
    blockData: ColBlockInterface;
    mode?: string;
}

const ColBlock = ({ indexes, blockData, mode }: ColBlockProps) => {
    const renderBlockContent = () => (
        <>
            {blockData.block_data?.map((block, index) => (
                <React.Fragment key={index}>
                    {mode === MODE_EDIT && (
                        <DropBlockComponent indexes={[...indexes ?? [], ...[index]]} />
                    )}
                    <RenderBlockComponent indexes={[...indexes ?? [], ...[index]]} blockData={block} mode={mode} />
                </React.Fragment>
            ))}
        </>
    )

    return (
        <Col
            className={blockData.class_name}
            style={StyleHelper.remoteStyleParse(blockData.style)}
            flex={blockData.flex ?? '1'}
            span={blockData.span}
            offset={blockData.offset}
            order={blockData.order}
            pull={blockData.pull}
            push={blockData.push}>
            {mode === MODE_EDIT ? (
                <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {renderBlockContent()}
                    </AddBlockInPageComponent>
                </BlockWrapperComponent>
            ) : renderBlockContent()}
        </Col>
    );
}

export default ColBlock;
