/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useRef, useCallback, useContext, useState } from 'react';
import { useDrop } from "ahooks";
import classNames from "classnames";
import PageBuilderContext from "@everyworkflow/page-builder-bundle/context/page-builder-context";
import DropBlockAction, { DROP_TYPE_BEFORE } from "@everyworkflow/page-builder-bundle/action/drop-block-action";

export const DROP_TYPE_VERTICAL = 'vertical';
export const DROP_TYPE_HORIZONTAL = 'horizontal'; // default

interface DropBlockComponentProps {
    indexes?: Array<number>;
    type?: string;
    dropType?: string;
}

const DropBlockComponent = ({
    indexes,
    type = DROP_TYPE_HORIZONTAL,
    dropType = DROP_TYPE_BEFORE,
}: DropBlockComponentProps) => {
    const { state: builderState, dispatch: builderDispatch } = useContext(PageBuilderContext);
    const [isHovering, setIsHovering] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    useDrop(dropRef, {
        onDom: (content: Array<number>, e: any) => {
            if (Array.isArray(content) && content.length) {
                DropBlockAction({
                    fromIndexes: content,
                    toIndexes: (Array.isArray(indexes) && indexes.length) ? indexes : [],
                    dropType: dropType,
                })(builderState, builderDispatch);
            }
        },
        onDragEnter: () => setIsHovering(true),
        onDragLeave: () => setIsHovering(false),
    });

    const isDropBoxEnable = useCallback((): boolean => {
        if (!Array.isArray(builderState.block_dragging) || !indexes) {
            return false;
        }
        /* Ignoring self dropbox */
        if (builderState.block_dragging?.join('-') === indexes.join('-')) {
            return false;
        }
        /* Ignoring child dropbox */
        if (builderState.block_dragging?.length < indexes.length) {
            const currentFirstPart = indexes.slice(0, builderState.block_dragging?.length);
            if (currentFirstPart.join('-') === builderState.block_dragging?.join('-')) {
                return false;
            }
        }
        return true;
    }, [builderState.block_dragging, indexes]);

    return (
        <div className={classNames('page-builder-drop-block')}>
            {isDropBoxEnable() && (
                <>
                    <div
                        ref={dropRef}
                        className={classNames('dropbox', type === DROP_TYPE_VERTICAL ? 'vertical' : '')} />
                    <div className={classNames('dropbox-content', type === DROP_TYPE_VERTICAL ? 'vertical' : '')}>
                        <div style={{ textAlign: 'center' }}>
                            <span
                                className={classNames('dropbox-content-text', type === DROP_TYPE_VERTICAL ? 'vertical' : '')}>
                                {isHovering ? 'Drop here' : 'Drag block here'}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default DropBlockComponent;
