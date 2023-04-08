/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useEffect, useReducer } from "react";
import PageBuilderInterface from "@everyworkflow/page-builder-bundle/model/page-builder-interface";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/component/render-block-component";
import PageBuilderContext from "@everyworkflow/page-builder-bundle/context/page-builder-context";
import PageBuilderReducer, { ACTION_SET_PAGE_BUILDER_STATE } from "@everyworkflow/page-builder-bundle/reducer/page-builder-reducer";
import { pageBuilderState } from "@everyworkflow/page-builder-bundle/state/page-builder-state";
import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/component/add-block-in-page-component";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/component/drop-block-component";
import '@everyworkflow/page-builder-bundle/style.css';

export const MODE_VIEW = 'view';
export const MODE_EDIT = 'edit';

interface PageBuilderComponentProps {
    pageBuilderData: PageBuilderInterface;
    mode?: string;
    children?: JSX.Element | JSX.Element[];
    onChange?: (pageBuilderData: PageBuilderInterface) => void;
}

const PageBuilderComponent = ({ pageBuilderData, mode = MODE_VIEW, children, onChange }: PageBuilderComponentProps) => {
    const getValidLoadData = (blockData: Array<BlockInterface>): Array<BlockInterface> => {
        const validBlockData: Array<BlockInterface> = [];
        blockData.forEach((item) => {
            if (item && item.block_type) {
                if (Array.isArray(item.block_data) && item.block_data.length) {
                    item['block_data'] = getValidLoadData(item.block_data);
                }
                validBlockData.push(item);
            }
        })
        return validBlockData;
    }

    const blockDataEmitHandler = (blockData: Array<BlockInterface>) => {
        const getValidBlockData = (blockData: Array<BlockInterface>): Array<BlockInterface> => {
            const validBlockData: Array<BlockInterface> = [];
            blockData.forEach((item) => {
                if (item && item.block_type) {
                    if (Array.isArray(item.block_data) && item.block_data.length) {
                        item['block_data'] = getValidBlockData(item.block_data);
                    }
                    validBlockData.push(item);
                }
            })
            return validBlockData;
        }
        if (onChange) {
            onChange({ block_data: getValidBlockData(blockData) });
        }
    }

    const [state, dispatch] = useReducer(PageBuilderReducer, {
        ...pageBuilderState,
        block_data: getValidLoadData(pageBuilderData.block_data),
        block_form_data: pageBuilderData.block_form_data,
        mode: mode,
        block_data_emit: blockDataEmitHandler,
    });

    useEffect(() => {
        dispatch({
            type: ACTION_SET_PAGE_BUILDER_STATE,
            payload: {
                block_data: getValidLoadData(pageBuilderData.block_data),
                mode: mode,
            }
        });
    }, [pageBuilderData, mode]);

    const renderContent = () => {
        try {
            return (
                <>
                    {state.block_data.map((block: BlockInterface, index: number) => (
                        <React.Fragment key={index}>
                            {state.mode === MODE_EDIT && <DropBlockComponent indexes={[index]} />}
                            <RenderBlockComponent indexes={[index]} blockData={block} mode={mode} />
                        </React.Fragment>
                    ))}
                    </>
            );
        } catch (error: any) {
            return null;
        }
    }

    return (
        <PageBuilderContext.Provider
            value={{ state: state, dispatch: dispatch }}>
            <>
                {renderContent()}
                {mode === MODE_EDIT && (
                    <div style={{ textAlign: 'center', padding: '26px 0' }}>
                        <AddBlockInPageComponent indexes={[]} />
                    </div>
                )}
                {children}
            </>
        </PageBuilderContext.Provider>
    );
}

export default PageBuilderComponent;
