/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BaseFieldInterface from '@everyworkflow/data-form-bundle/Model/Field/BaseFieldInterface';
import OptionInterface from '@everyworkflow/data-form-bundle/Model/Field/Select/OptionInterface';

interface CascaderFieldInterface extends BaseFieldInterface {
  options?: Array<OptionInterface>;
  row_class_name?: string;
  label_class_name?: string;
  class_name?: string;
  is_searchable?: boolean;
}

export default CascaderFieldInterface;
