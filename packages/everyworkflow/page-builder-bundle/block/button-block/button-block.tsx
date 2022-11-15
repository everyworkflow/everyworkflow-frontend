/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Link } from 'react-router-dom';
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import ButtonBlockInterface from "@everyworkflow/page-builder-bundle/model/block/button-block-interface";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import Button from "antd/lib/button";

interface ButtonBlockProps {
    indexes?: Array<number>;
    blockData: ButtonBlockInterface;
    mode?: string;
}

const ButtonBlock = ({ indexes, blockData, mode }: ButtonBlockProps) => {
    return (
        <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
            <Button
                className={blockData.class_name}
                type={blockData.button_type}
                size={blockData.button_size}
                block={blockData.button_block}
                danger={blockData.button_danger}
                shape={blockData.button_shape}
                style={StyleHelper.remoteStyleParse(blockData.style)}>
                {blockData.button_path ? (
                    <Link to={blockData.button_path} target={blockData.button_target}>{blockData.button_label}</Link>
                ) : blockData.button_label}
            </Button>
        </BlockWrapperComponent>
    );
}

export default ButtonBlock;
