/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useRef, useCallback, useContext, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { CopyOutlined, DeleteOutlined, ToolOutlined } from "@ant-design/icons";
import { useDrag } from "ahooks";
import PageBuilderContext from "@everyworkflow/page-builder-bundle/context/page-builder-context";
import { MODE_VIEW } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";
import BlockFormInterface from "@everyworkflow/page-builder-bundle/model/block-form-interface";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import {
    ACTION_ADD_BLOCK_FORM_DATA,
    ACTION_SET_BLOCK_DRAGGING
} from "@everyworkflow/page-builder-bundle/reducer/page-builder-reducer";
import DeleteBlockAction from "@everyworkflow/page-builder-bundle/action/delete-block-action";
import DuplicateBlockAction from "@everyworkflow/page-builder-bundle/action/duplicate-block-action";
import BlockFormComponent from "@everyworkflow/page-builder-bundle/component/block-form-component";

interface EditableBlockComponentProps {
    indexes?: Array<number>;
    blockData?: BlockInterface;
    children?: JSX.Element | JSX.Element[];
}

const PANEL_TYPE_EDIT = 'edit';

const EditableBlockComponent = ({ indexes, blockData, children }: EditableBlockComponentProps) => {
    const { state: builderState, dispatch: builderDispatch } = useContext(PageBuilderContext);
    const [panelType, setPanelType] = useState<string | undefined>(undefined);
    const dragRef = useRef<HTMLDivElement>(null);

    useDrag(indexes, dragRef, {
        onDragStart: () => {
            builderDispatch({ type: ACTION_SET_BLOCK_DRAGGING, payload: indexes })
        },
        onDragEnd: () => {
            builderDispatch({ type: ACTION_SET_BLOCK_DRAGGING, payload: undefined })
        },
    });

    const getBlockFormData = useCallback((): BlockFormInterface | undefined => {
        return builderState.block_form_data?.find((item: BlockFormInterface) => {
            return item.block_type === blockData?.block_type;
        });
    }, [builderState.block_form_data, blockData?.block_type]);

    if (builderState.mode === MODE_VIEW) {
        return <>{children}</>;
    }

    const onEditClickHandle = async () => {
        setPanelType(PANEL_TYPE_EDIT);
        const blockForm = builderState.block_form_data?.find((item: BlockFormInterface) => {
            return item.block_type === blockData?.block_type;
        });
        if (blockForm === undefined) {
            const res = await Remote.get(`/page-builder/block-form/${blockData?.block_type}?for=data-form`);
            await builderDispatch({ type: ACTION_ADD_BLOCK_FORM_DATA, payload: res });
        }
    }

    const onDuplicateClickHandle = () => {
        if (indexes && indexes.length) {
            DuplicateBlockAction(indexes)(builderState, builderDispatch);
        }
    }

    return (
        <div className="page-builder-debug-box">
            <span ref={dragRef} className="page-builder-block-title drag-able">
                {blockData?.block_type.split('_').join(' ')}
            </span>
            {blockData?.block_type !== 'abstract_block' && (
                <Space className="page-builder-block-actions">
                    <Tooltip title={'Delete block'} className="addition-item">
                        <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                DeleteBlockAction(indexes ?? [])(builderState, builderDispatch);
                            }}
                            danger={true}
                        />
                    </Tooltip>
                    <Tooltip title={'Duplicate block'} className="addition-item">
                        <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={onDuplicateClickHandle}
                        />
                    </Tooltip>
                    <Tooltip
                        title={getBlockFormData()?.title ? 'Edit: ' + getBlockFormData()?.title : 'Edit block'}
                        className="btn-edit-block-wrapper">
                        <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<ToolOutlined className="flip-icon" />}
                            onClick={onEditClickHandle}
                        />
                    </Tooltip>
                </Space>
            )}
            {panelType === PANEL_TYPE_EDIT && (
                <BlockFormComponent indexes={indexes} blockData={blockData} onClose={() => {
                    setPanelType(undefined);
                }} />
            )}
            {children}
        </div>
    );
}

export default EditableBlockComponent;
