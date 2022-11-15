/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Col from 'antd/lib/col';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Checkbox from 'antd/lib/checkbox';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import MediaItemInterface from '@everyworkflow/media-manager-bundle/model/media-item-interface';
import {
    ACTION_PUSH_SELECTED_MEDIA,
    ACTION_REMOVE_SELECTED_MEDIA,
    ACTION_SELECTED_MEDIA_FOR_CONFIG,
    ACTION_SET_PREVIEW_IMAGE,
} from '@everyworkflow/media-manager-bundle/reducer/media-manager-reducer';
import MediaManagerContext from '@everyworkflow/media-manager-bundle/context/media-manager-context';
import MediaGridItemContent from '@everyworkflow/media-manager-bundle/component/media-grid-item/media-grid-item-content';
import PreviewImageInterface from '@everyworkflow/media-manager-bundle/model/preview-image-interface';
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';

interface MediaGridItemProps {
    itemData: MediaItemInterface;
}

const MediaGridItem = ({ itemData }: MediaGridItemProps) => {
    const { state: mediaState, dispatch: mediaDispatch } = useContext(
        MediaManagerContext
    );
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
        const currentMediaIndex = mediaState.selected_media_data.findIndex(
            (item) => item.path_name === itemData.path_name
        );
        setIsSelected(currentMediaIndex !== -1);
    }, [mediaState.selected_media_data, itemData]);

    const onMediaItemClick = () => {
        if (isSelected) {
            mediaDispatch({ type: ACTION_REMOVE_SELECTED_MEDIA, payload: itemData });
        } else {
            mediaDispatch({ type: ACTION_PUSH_SELECTED_MEDIA, payload: itemData });
        }
        setIsSelected(!isSelected);
    };

    return (
        <Col>
            <div
                className={classNames(
                    'app-media-grid-item mb-1',
                    isSelected ? 'selected' : ''
                )}
                style={{ marginBottom: 8 }}>
                <div style={{ height: 28 }}>
                    <Space
                        align="end"
                        style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Checkbox checked={isSelected} onChange={onMediaItemClick} />
                        {['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp'].includes(itemData.extension) && (
                            <Tooltip title="Preview" placement="bottom">
                                <Button
                                    type="dashed"
                                    shape="circle"
                                    size="small"
                                    icon={<EyeOutlined />}
                                    onClick={() => {
                                        mediaDispatch({
                                            type: ACTION_SET_PREVIEW_IMAGE,
                                            payload: ({
                                                src: UrlHelper.buildImgUrlFromPath(itemData.path_name),
                                                title: itemData.file_name,
                                                visible: true,
                                            } as PreviewImageInterface),
                                        });
                                    }}
                                />
                            </Tooltip>
                        )}
                        <Tooltip title="Properties" placement="bottom">
                            <Button
                                type="dashed"
                                shape="circle"
                                size="small"
                                icon={<SettingOutlined />}
                                onClick={() => {
                                    mediaDispatch({
                                        type: ACTION_SELECTED_MEDIA_FOR_CONFIG,
                                        payload: itemData,
                                    });
                                }}
                            />
                        </Tooltip>
                    </Space>
                </div>
                <Tooltip title={itemData.file_name} placement="bottom">
                    <Button
                        onClick={onMediaItemClick}
                        style={{ height: 'auto', padding: 0 }}>
                        <MediaGridItemContent
                            title={itemData.file_name}
                            pathName={itemData.path_name}
                            extension={itemData.extension}
                            thumbnailPath={itemData.thumbnail_path}
                            imageSize={122} />
                    </Button>
                </Tooltip>
            </div>
        </Col>
    );
};

export default MediaGridItem;
