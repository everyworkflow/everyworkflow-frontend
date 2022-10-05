/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/Model/BlockInterface";
import SelectedMediaItemInterface from "@everyworkflow/media-manager-bundle/Model/SelectedMediaItemInterface";

interface ImageBlockInterface extends BlockInterface {
    alt?: string;
    fallback?: string;
    height?: number | string;
    width?: number | string;
    preview?: boolean;
    image?: SelectedMediaItemInterface,
}

export default ImageBlockInterface;
