/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback } from 'react';
import { Image } from "antd";
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
    const getImageSrc = useCallback(() => {
        return typeof blockData.image === 'string' ? blockData.image : (blockData.image?.path_name ?? '');
    }, [blockData])

    const getThumbnailSrc = useCallback(() => {
        return typeof blockData.image === 'string' ? blockData.image : (blockData.image?.path_name ?? '');
    }, [blockData])

    return (
        <>
            <BlockWrapperComponent indexes={indexes} blockData={blockData} mode={mode}>
                <Image
                    className={blockData.class_name}
                    alt={blockData.alt}
                    fallback={blockData.fallback}
                    height={blockData.height}
                    width={blockData.width}
                    src={UrlHelper.buildImgUrlFromPath(getImageSrc())}
                    placeholder={getThumbnailSrc()}
                    preview={blockData.preview === undefined ? false : blockData.preview}
                    style={StyleHelper.remoteStyleParse(blockData.style)}
                />
            </BlockWrapperComponent>
        </>
    );
}

export default ImageBlock;
