/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from '@everyworkflow/data-form-bundle/model/field/base-field-interface';
import OptionInterface from '@everyworkflow/data-form-bundle/model/field/select/option-interface';

interface TreeSelectFieldInterface extends BaseFieldInterface {
    options?: Array<OptionInterface>;
    row_class_name?: string;
    label_class_name?: string;
    class_name?: string;
    is_searchable?: boolean;
    is_default_expand_all?: boolean;
    multi_select?: boolean;
}

export default TreeSelectFieldInterface;
