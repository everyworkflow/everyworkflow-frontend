/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import MediaItemInterface from "@everyworkflow/media-manager-bundle/Model/MediaItemInterface";
import MediaDirItemInterface from "@everyworkflow/media-manager-bundle/Model/MediaDirItemInterface";

interface MediaResponseDataInterface {
    media_manager_data?: {
        results: Array<MediaItemInterface>;
    };
    media_manager_dir_data?: Array<MediaDirItemInterface>;
}

export default MediaResponseDataInterface;
