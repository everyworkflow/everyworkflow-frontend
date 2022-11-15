/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from '@everyworkflow/data-form-bundle/model/field/base-field-interface';

interface MediaImageSelectorFieldInterface extends BaseFieldInterface {
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    options?: any;
    upload_path?: string;
}

export default MediaImageSelectorFieldInterface;
