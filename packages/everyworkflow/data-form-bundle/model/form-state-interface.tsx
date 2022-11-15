/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import DataFormInterface from "@everyworkflow/data-form-bundle/model/data-form-interface";
import { FormInstance } from "antd/lib/form";

interface FormStateInterface {
    form_type?: "vertical" | "horizontal" | "inline";
    form_data?: DataFormInterface;

    form_id?: string;
    form?: FormInstance;
    mode?: string;

    initial_values?: any;
    form_errors?: any;

    form_section_maps?: any;
    form_field_maps?: any;

    hidden_field_names: Array<string>;
    invisible_field_names: Array<string>;
    disable_field_names: Array<string>;

    form_update_data: any;
}

export default FormStateInterface;
