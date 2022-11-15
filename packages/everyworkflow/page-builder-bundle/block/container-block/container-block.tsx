/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import classNames from "classnames";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import ContainerBlockInterface from "@everyworkflow/page-builder-bundle/model/block/container-block-interface";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/component/render-block-component";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/component/add-block-in-page-component";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/component/drop-block-component";

interface ContainerBlockProps {
    indexes?: Array<number>;
    blockData: ContainerBlockInterface;
    mode?: string;
}

const ContainerBlock = ({ indexes, blockData, mode }: ContainerBlockProps) => {
    const renderBlockContent = () => (
        <div
            className={classNames(blockData.container_type === 'container-center' ? 'app-container-center' : '', blockData.class_name)}
            style={StyleHelper.remoteStyleParse(blockData.content_style)}>
            {blockData.block_data?.map((block, index) => (
                <React.Fragment key={index}>
                    {mode === MODE_EDIT && (
                        <DropBlockComponent indexes={[...indexes ?? [], ...[index]]} />
                    )}
                    <RenderBlockComponent
                        indexes={[...indexes ?? [], ...[index]]}
                        blockData={{ ...block, block_type: block.block_type }}
                        mode={mode}
                    />
                </React.Fragment>
            ))}
        </div>
    )

    return (
        <div style={StyleHelper.remoteStyleParse(blockData.style)}>
            {mode === MODE_EDIT ? (
                <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {renderBlockContent()}
                    </AddBlockInPageComponent>
                </BlockWrapperComponent>
            ) : renderBlockContent()}
        </div>
    );
}

export default ContainerBlock;
