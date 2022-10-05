/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { CSSProperties } from "react";

interface ButtonInterface {
    button_label?: string;
    button_path?: string;
    button_type?: 'default' | 'text' | 'link' | 'ghost' | 'primary' | 'dashed' | undefined;
    button_size?: 'small' | 'middle' | 'large' | undefined;
    button_shape?: 'circle' | 'round' | undefined;
    button_target?: string;
    is_ghost?: boolean;
    is_danger?: boolean;
    is_block?: boolean;
    class_name?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

export default ButtonInterface;
