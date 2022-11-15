/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import LinkWrapperBlockInterface from "@everyworkflow/page-builder-bundle/model/block/link-wrapper-block-interface";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/component/drop-block-component";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/component/render-block-component";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/component/add-block-in-page-component";
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";

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
                <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                    <AddBlockInPageComponent blockData={blockData} indexes={indexes}>
                        {blockData.style ? (
                            <div style={StyleHelper.remoteStyleParse(blockData.style)}>
                                {renderBlockContent()}
                            </div>
                        ) : renderBlockContent()}
                    </AddBlockInPageComponent>
                </BlockWrapperComponent>
            ) : blockData.link_path ? (
                <Link to={blockData.link_path} target={blockData.link_target}>
                    {blockData.style ? (
                        <div style={StyleHelper.remoteStyleParse(blockData.style)}>
                            {renderBlockContent()}
                        </div>
                    ) : renderBlockContent()}
                </Link>
            ) : renderBlockContent()}
        </>
    );
}

export default LinkWrapperBlock;
