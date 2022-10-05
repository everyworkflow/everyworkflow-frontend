/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import LinkWrapperBlockInterface from "@everyworkflow/page-builder-bundle/Model/Block/LinkWrapperBlockInterface";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/Component/EditableBlockComponent";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent/PageBuilderComponent";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/Component/DropBlockComponent";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/Component/RenderBlockComponent";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/Component/AddBlockInPageComponent";
import StyleHelper from "@everyworkflow/panel-bundle/Helper/StyleHelper";

interface LinkWrapperBlockProps {
    indexes?: Array<number>;
    blockData: LinkWrapperBlockInterface;
    mode?: string;
}

const LinkWrapperBlock = ({ indexes, blockData, mode }: LinkWrapperBlockProps) => {
    const renderBlockContent = () => (
        <>
            {blockData.block_data?.map((block, index) => (
                <React.Fragment key={index}>
                    {mode === MODE_EDIT && (
                        <DropBlockComponent indexes={[...indexes ?? [], index]} />
                    )}
                    <RenderBlockComponent indexes={[...indexes ?? [], index]} blockData={block} mode={mode} />
                </React.Fragment>
            ))}
        </>
    )

    return (
        <>
            {mode === MODE_EDIT ? (
                <EditableBlockComponent blockData={blockData} indexes={indexes}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {blockData.style ? (
                            <div style={StyleHelper.remoteStyleParse(blockData.style)}>
                                {renderBlockContent()}
                            </div>
                        ) : renderBlockContent()}
                    </AddBlockInPageComponent>
                </EditableBlockComponent>
            ) : blockData.link_path ? (
                <NavLink to={blockData.link_path} target={blockData.link_target}>
                    {blockData.style ? (
                        <div style={StyleHelper.remoteStyleParse(blockData.style)}>
                            {renderBlockContent()}
                        </div>
                    ) : renderBlockContent()}
                </NavLink>
            ) : renderBlockContent()}
        </>
    );
}

export default LinkWrapperBlock;
