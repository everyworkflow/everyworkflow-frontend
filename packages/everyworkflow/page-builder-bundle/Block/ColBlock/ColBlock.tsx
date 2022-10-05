/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Col from "antd/lib/col";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/Component/RenderBlockComponent";
import ColBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/ColBlockInterface";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/Component/AddBlockInPageComponent";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/Component/DropBlockComponent";

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
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {renderBlockContent()}
                    </AddBlockInPageComponent>
                </EditableBlockComponent>
            ) : renderBlockContent()}
        </Col>
    );
}

export default ColBlock;
