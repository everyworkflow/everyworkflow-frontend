/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/Model/SelectedMediaItemInterface";
import SidePanelComponent from "@everyworkflow/panel-bundle/Component/SidePanelComponent";
import MediaManagerComponent from "@everyworkflow/media-manager-bundle/Component/MediaManagerComponent";

interface MediaPanelComponentProps {
    mediaManagerId?: string;
    initType?: string;
    mediaPath?: string;
    selectedMediaData?: Array<SelectedMediaItemInterface>;
    onSelectedDataChange?: (items: any) => void;
    onClose?: () => void;
    title?: string;
    size?: string;
    fromDirection?: string;
    style?: React.CSSProperties;
}

const MediaPanelComponent = ({
    mediaManagerId,
    initType,
    mediaPath = '/media',
    selectedMediaData = [],
    onSelectedDataChange,
    onClose,
    title,
    size,
    fromDirection,
    style
}: MediaPanelComponentProps) => {
    return (
        <SidePanelComponent
            title={title ?? 'Media Manager'}
            style={style}
            size={size}
            onClose={onClose}
            fromDirection={fromDirection}>
            <MediaManagerComponent
                mediaManagerId={mediaManagerId}
                initType={initType}
                mediaPath={mediaPath}
                selectedMediaData={selectedMediaData}
                onClose={onClose}
                onSelectedDataChange={onSelectedDataChange}
            />
        </SidePanelComponent>
    );
};

export default MediaPanelComponent;
