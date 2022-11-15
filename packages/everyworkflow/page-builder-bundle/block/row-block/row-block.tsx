/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Row from "antd/lib/row";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/component/render-block-component";
import RowBlockInterface from "@everyworkflow/page-builder-bundle/model/block/row-block-interface";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/component/add-block-in-page-component";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/component/drop-block-component";
import { DROP_TYPE_VERTICAL } from "@everyworkflow/page-builder-bundle/component/drop-block-component/drop-block-component";
import { DROP_TYPE_INSIDE } from "@everyworkflow/page-builder-bundle/action/drop-block-action";

interface RowBlockProps {
    indexes?: Array<number>;
    blockData: RowBlockInterface;
    mode?: string;
}

const RowBlock = ({ indexes, blockData, mode }: RowBlockProps) => {
    const renderBlockContent = () => (
        <Row
            className={blockData.class_name}
            align={blockData.align ?? 'top'}
            gutter={blockData.gutter}
            justify={blockData.justify ?? 'start'}
            wrap={blockData.wrap}
            style={StyleHelper.remoteStyleParse(blockData.style)}>
            {blockData.block_data?.map((block, index) => (
                <React.Fragment key={index}>
                    {mode === MODE_EDIT && (
                        <DropBlockComponent indexes={[...indexes ?? [], ...[index]]} type={DROP_TYPE_VERTICAL} />
                    )}
                    <RenderBlockComponent indexes={[...indexes ?? [], ...[index]]} blockData={block} mode={mode} />
                    {(mode === MODE_EDIT && blockData.block_data?.length === (index + 1)) && (
                        <DropBlockComponent indexes={indexes} type={DROP_TYPE_VERTICAL} dropType={DROP_TYPE_INSIDE} />
                    )}
                </React.Fragment>
            ))}
        </Row>
    )

    return (
        <>
            {mode === MODE_EDIT ? (
                <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {renderBlockContent()}
                    </AddBlockInPageComponent>
                </BlockWrapperComponent>
            ) : renderBlockContent()}
        </>
    );
}

export default RowBlock;
