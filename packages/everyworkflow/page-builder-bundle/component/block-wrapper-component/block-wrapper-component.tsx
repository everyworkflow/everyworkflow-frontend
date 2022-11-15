/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import EditableBlockComponent from "@everyworkflow/page-builder-bundle/component/editable-block-component";
import { MODE_EDIT } from "@everyworkflow/page-builder-bundle/component/page-builder-component/page-builder-component";

interface BlockWrapperComponentProps {
    indexes?: Array<number>,
    blockData?: BlockInterface;
    mode?: string;
    children?: JSX.Element | JSX.Element[];
}

const BlockWrapperComponent = ({ indexes, blockData, mode, children }: BlockWrapperComponentProps) => {
    if (mode === MODE_EDIT) {
        return (
            <EditableBlockComponent blockData={blockData} indexes={indexes}>
                {children}
            </EditableBlockComponent>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default BlockWrapperComponent;
