/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from "react";

const MediaFileSelectorField = lazy(() => import("@everyworkflow/media-manager-bundle/field/media-file-selector-field"));
const MediaImageSelectorField = lazy(() => import("@everyworkflow/media-manager-bundle/field/media-image-selector-field"));
const MediaImageGallerySelectorField = lazy(() => import("@everyworkflow/media-manager-bundle/field/media-image-gallery-selector-field"));
const MediaFileUploaderField = lazy(() => import("@everyworkflow/media-manager-bundle/field/media-file-uploader-field"));
const MediaImageUploaderField = lazy(() => import("@everyworkflow/media-manager-bundle/field/media-image-uploader-field"));
const MediaImageGalleryUploaderField = lazy(() => import("@everyworkflow/media-manager-bundle/field/media-image-gallery-uploader-field"));

export const MediaFormFieldMaps: any = {
    media_file_selector_field: MediaFileSelectorField,
    media_image_selector_field: MediaImageSelectorField,
    media_image_gallery_selector_field: MediaImageGallerySelectorField,
    media_file_uploader_field: MediaFileUploaderField,
    media_image_uploader_field: MediaImageUploaderField,
    media_image_gallery_uploader_field: MediaImageGalleryUploaderField,
};
