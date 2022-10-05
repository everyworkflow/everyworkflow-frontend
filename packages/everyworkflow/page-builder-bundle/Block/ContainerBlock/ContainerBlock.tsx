/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import ContainerBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/ContainerBlockInterface";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/Component/RenderBlockComponent";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/Component/AddBlockInPageComponent";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";
import classNames from "classnames";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/Component/DropBlockComponent";

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
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {renderBlockContent()}
                    </AddBlockInPageComponent>
                </EditableBlockComponent>
            ) : renderBlockContent()}
        </div>
    );
}

export default ContainerBlock;
