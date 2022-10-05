/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import Row from "antd/lib/row";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/Component/RenderBlockComponent";
import RowBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/RowBlockInterface";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/Component/AddBlockInPageComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/Component/DropBlockComponent";
import { DROP_TYPE_VERTICAL } from "@everyworkflow/page-builder-bundle/Component/DropBlockComponent/DropBlockComponent";
import { DROP_TYPE_INSIDE } from "@everyworkflow/page-builder-bundle/Action/DropBlockAction";

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
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {renderBlockContent()}
                    </AddBlockInPageComponent>
                </EditableBlockComponent>
            ) : renderBlockContent()}
        </>
    );
}

export default RowBlock;
