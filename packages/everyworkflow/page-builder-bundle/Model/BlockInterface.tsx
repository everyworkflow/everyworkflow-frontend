/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { CSSProperties } from "react";

interface BlockInterface {
    block_type: string;
    class_name?: string;
    style?: CSSProperties;
    block_data?: Array<any>;
}

export default BlockInterface;
