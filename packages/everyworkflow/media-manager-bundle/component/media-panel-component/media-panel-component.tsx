/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/model/selected-media-item-interface";
import SidePanelComponent from "@everyworkflow/panel-bundle/component/side-panel-component";
import MediaManagerComponent from "@everyworkflow/media-manager-bundle/component/media-manager-component";

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
