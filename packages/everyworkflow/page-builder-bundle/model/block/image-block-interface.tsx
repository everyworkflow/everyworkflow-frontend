/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";
import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/model/selected-media-item-interface";

interface ImageBlockInterface extends BlockInterface {
    alt?: string;
    fallback?: string;
    height?: number | string;
    width?: number | string;
    preview?: boolean;
    image?: SelectedMediaItemInterface,
    use_image_dark?: boolean;
    image_dark?: SelectedMediaItemInterface,
}

export default ImageBlockInterface;
