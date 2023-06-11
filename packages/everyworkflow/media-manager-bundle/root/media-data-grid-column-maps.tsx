/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const MediaImageGallerySelectorFieldColumn = lazy(() => import("@everyworkflow/media-manager-bundle/column/media-image-gallery-selector-field-column"));

export const MediaDataGridColumnMaps: any = {
    media_image_gallery_selector_field: MediaImageGallerySelectorFieldColumn,
};
