/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, {useEffect, useReducer} from "react";
import PageBuilderInterface from "@everyworkflow/page-builder-bundle/Model/PageBuilderInterface";
import RenderBlockComponent from "@everyworkflow/page-builder-bundle/Component/RenderBlockComponent";
import PageBuilderContext from "@everyworkflow/page-builder-bundle/Context/PageBuilderContext";
import PageBuilderReducer from "@everyworkflow/page-builder-bundle/Reducer/PageBuilderReducer";
import {pageBuilderState} from "@everyworkflow/page-builder-bundle/State/PageBuilderState";
import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import AddBlockInPageComponent from "@everyworkflow/page-builder-bundle/Component/AddBlockInPageComponent";
import DropBlockComponent from "@everyworkflow/page-builder-bundle/Component/DropBlockComponent";

export const MODE_VIEW = 'view';
export const MODE_EDIT = 'edit';

interface PageBuilderComponentProps {
    pageBuilderData: PageBuilderInterface;
    mode?: string;
    children?: JSX.Element | JSX.Element[];
    onChange?: (pageBuilderData: PageBuilderInterface) => void;
}

const PageBuilderComponent = ({pageBuilderData, mode = MODE_VIEW, children, onChange}: PageBuilderComponentProps) => {
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

    const [state, dispatch] = useReducer(PageBuilderReducer, {
        ...pageBuilderState,
        block_data: getValidLoadData(pageBuilderData.block_data),
        block_form_data: pageBuilderData.block_form_data,
        mode: mode,
    });

    useEffect(() => {
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
            onChange({block_data: getValidBlockData(state.block_data)});
        }
    }, [state]);

    const renderContent = () => (
        <>
            {state.block_data.map((block: BlockInterface, index: number) => (
                <React.Fragment key={index}>
                    <DropBlockComponent indexes={[index]}/>
                    <RenderBlockComponent indexes={[index]} blockData={block} mode={mode}/>
                </React.Fragment>
            ))}
        </>
    )

    return (
        <PageBuilderContext.Provider
            value={{state: state, dispatch: dispatch}}>
            <>
                {renderContent()}
                {mode === MODE_EDIT && (
                    <div style={{textAlign: 'center', padding: '26px 0'}}>
                        <AddBlockInPageComponent indexes={[]}/>
                    </div>
                )}
                {children}
            </>
        </PageBuilderContext.Provider>
    );
}

export default PageBuilderComponent;
