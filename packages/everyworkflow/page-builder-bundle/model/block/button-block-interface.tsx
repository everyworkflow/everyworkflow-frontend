/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import BlockInterface from "@everyworkflow/page-builder-bundle/model/block-interface";

interface ButtonBlockInterface extends BlockInterface {
    button_label?: string;
    button_path?: string;
    button_type?: 'default' | 'text' | 'link' | 'ghost' | 'primary' | 'dashed' | undefined;
    button_size?: 'small' | 'middle' | 'large' | undefined;
    button_shape?: 'circle' | 'round' | undefined;
    button_target?: string;
    button_ghost?: boolean;
    button_danger?: boolean;
    button_block?: boolean;
}

export default ButtonBlockInterface;
