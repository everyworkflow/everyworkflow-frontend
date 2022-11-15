/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Image from "antd/lib/image";
import { isString } from 'lodash';
import StyleHelper from "@everyworkflow/panel-bundle/helper/style-helper";
import ImageBlockInterface from "@everyworkflow/page-builder-bundle/model/block/image-block-interface";
import BlockWrapperComponent from "@everyworkflow/page-builder-bundle/component/block-wrapper-component";
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';

interface ImageBlockProps {
    indexes?: Array<number>;
    blockData: ImageBlockInterface;
    mode?: string;
}

const ImageBlock = ({ indexes, blockData, mode }: ImageBlockProps) => {
    return (
        <>
            <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                <Image
                    className={blockData.class_name}
                    alt={blockData.alt ?? blockData.image?.title}
                    fallback={blockData.fallback}
                    height={blockData.height}
                    width={blockData.width}
                    src={UrlHelper.buildImgUrlFromPath(isString(blockData.image) ? blockData.image : (blockData.image?.path_name ?? ''))}
                    placeholder={blockData.image?.thumbnail_path}
                    preview={blockData.preview === undefined ? false : blockData.preview}
                    style={StyleHelper.remoteStyleParse(blockData.style)}
                />
            </BlockWrapperComponent>
        </>
    );
}

export default ImageBlock;
