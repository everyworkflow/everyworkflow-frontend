/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useState } from 'react';
import { PlusOutlined } from "@ant-design/icons";
import Tooltip from "antd/lib/tooltip";
import Button from "antd/lib/button";
import SidePanelComponent from "@everyworkflow/panel-bundle/component/side-panel-component";
import { PANEL_SIZE_MEDIUM } from "@everyworkflow/panel-bundle/component/side-panel-component/side-panel-component";
import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import SetBlockDataAction from "@everyworkflow/page-builder-bundle/action/set-block-data-action";
import PageBuilderContext from "@everyworkflow/page-builder-bundle/context/page-builder-context";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/component/drop-block-component";
import { DROP_TYPE_INSIDE } from "@everyworkflow/page-builder-bundle/action/drop-block-action";

const PANEL_TYPE_ADD_BLOCK = 'add_block';

interface AddBlockInPageComponentProps {
    indexes?: Array<number>;
    blockData?: BlockInterface;
    children?: JSX.Element | JSX.Element[];
}

const blockList: any = {
    container_block: 'Container block',
    row_block: 'Row block',
    col_block: 'Col block',
    heading_block: 'Heading block',
    paragraph_block: 'Paragraph block',
    button_block: 'Button block',
    link_wrapper_block: 'Link wrapper block',
    image_block: 'Image block',
    data_form_block: 'Data form block',
    markdown_block: 'Markdown block',
};

const AddBlockInPageComponent = ({ indexes, children }: AddBlockInPageComponentProps) => {
    const { state: builderState, dispatch: builderDispatch } = useContext(PageBuilderContext);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);

    const onInsertBlock = (currentBlock: string) => {
        if (indexes && Array.isArray(indexes)) {
            const blockData: Array<BlockInterface> = builderState.block_data;
            let currentArrNodePointer: Array<BlockInterface> = blockData;
            indexes.forEach((val) => {
                if (currentArrNodePointer[val]) {
                    if (!currentArrNodePointer[val].block_data) {
                        currentArrNodePointer[val].block_data = [];
                    }
                    currentArrNodePointer = currentArrNodePointer[val].block_data ?? [];
                }
            })
            currentArrNodePointer.push({ block_type: currentBlock });
            SetBlockDataAction(blockData)(builderState, builderDispatch);
        } else {
            const blockData: Array<BlockInterface> = builderState.block_data;
            blockData.push({ block_type: currentBlock });
            SetBlockDataAction(blockData)(builderState, builderDispatch);
        }

        setPanelType(undefined);
    }

    return (
        <>
            {children}
            <DropBlockComponent indexes={indexes} dropType={DROP_TYPE_INSIDE} />
            <div className="page-builder-add-block-wrapper">
                <Tooltip title="Add new block" className="btn-add-new-block-wrapper">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setPanelType(PANEL_TYPE_ADD_BLOCK);
                        }}
                    />
                </Tooltip>
                {panelType === PANEL_TYPE_ADD_BLOCK && (
                    <SidePanelComponent
                        title={'Add new block'}
                        size={PANEL_SIZE_MEDIUM}
                        onClose={() => {
                            setPanelType(undefined);
                        }}
                        footerStyle={{ textAlign: 'center' }}>
                        {Object.keys(blockList).map((key, index) => (
                            <React.Fragment key={index}>
                                <Button style={{
                                    padding: '24px 14px 46px',
                                    marginBottom: 8,
                                    width: '100%',
                                }} onClick={() => onInsertBlock(key)}>
                                    {blockList[key]}
                                </Button>
                            </React.Fragment>
                        ))}
                    </SidePanelComponent>
                )}
            </div>
        </>
    );
}

export default AddBlockInPageComponent;
