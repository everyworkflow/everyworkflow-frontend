/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Button, Space, Image, Tooltip } from 'antd';
import { ReactSortable } from 'react-sortablejs';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import FileImageOutlined from '@ant-design/icons/FileImageOutlined';
import MediaImageSelectorFieldInterface from '@everyworkflow/media-manager-bundle/model/field/media-image-selector-field-interface';
import MediaPanelComponent from "@everyworkflow/media-manager-bundle/component/media-panel-component";
import { MEDIA_MANAGER_TYPE_MULTI_SELECT } from '@everyworkflow/media-manager-bundle/component/media-manager-component/media-manager-component';
import MediaGridItemContent from '@everyworkflow/media-manager-bundle/component/media-grid-item/media-grid-item-content';
import SelectedMediaItemInterface from '@everyworkflow/media-manager-bundle/model/selected-media-item-interface';
import FieldEditPanel from '@everyworkflow/media-manager-bundle/component/field-edit-panel';
import DynamicFieldPropsInterface from "@everyworkflow/data-form-bundle/model/dynamic-field-props-interface";
import FormContext from '@everyworkflow/data-form-bundle/context/form-context';
import PreviewImageInterface from '@everyworkflow/media-manager-bundle/model/preview-image-interface';
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';

interface MediaImageGallerySelectorFieldProps extends DynamicFieldPropsInterface {
    fieldData: MediaImageSelectorFieldInterface;
}

// eslint-disable-next-line react/display-name
const CustomReactSortable = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <Row gutter={16} ref={ref}>
            {props.children}
        </Row>
    );
});

const MediaImageGallerySelectorField = ({ fieldData, children }: MediaImageGallerySelectorFieldProps) => {
    const { state: formState } = useContext(FormContext);
    const [isMediaSelectorEnabled, setIsMediaSelectorEnabled] = useState(false);
    const [mediaItemConfigPath, setMediaItemConfigPath] = useState<string | undefined>(undefined);
    const [previewItem, setPreviewItem] = useState<PreviewImageInterface | undefined>(undefined);
    const [selectedMediaItems, setSelectedMediaItems] = useState<SelectedMediaItemInterface[]>(((): Array<SelectedMediaItemInterface> => {
        if (fieldData.name && formState.initial_values && formState.initial_values[fieldData.name]) {
            if (formState.initial_values[fieldData.name] === 'string') {
                return formState.initial_values[fieldData.name];
            } else {
                return formState.initial_values[fieldData.name];
            }
        }
        return [];
    })());

    useEffect(() => {
        const updateValues: any = {};
        if (fieldData.name && selectedMediaItems.length) {
            const mediaValues: Array<any> = [];
            selectedMediaItems.map((item: SelectedMediaItemInterface) => {
                mediaValues.push({
                    path_name: item?.path_name,
                    thumbnail_path: item?.thumbnail_path,
                    title: item?.title,
                });
            });
            updateValues[fieldData.name] = mediaValues;
        }
        if (Object.keys(updateValues).length) {
            formState.form?.setFieldsValue(updateValues);
        }
    }, [selectedMediaItems]);

    const getSortableList = useCallback(() => {
        return selectedMediaItems.map((item: SelectedMediaItemInterface, index: number) => ({
            id: index,
            ...item,
        }));
    }, [selectedMediaItems]);

    const setSortableList = (items: Array<any>) => {
        const selectedItems: Array<SelectedMediaItemInterface> = items.map((item: any) => ({
            title: item.title ?? '',
            path_name: item.path_name ?? '',
            thumbnail_path: item.thumbnail_path ?? '',
        }));
        updateMediaGalleryField(selectedItems);
    }

    const handleMediaGalleryUpdate = (selectedItems: Array<any>) => {
        const newSelectedItems = [...selectedMediaItems];
        selectedItems.forEach(item => {
            const alreadyExistingItemIndex = newSelectedItems.findIndex(selectedItem => selectedItem.path_name === item.path_name);
            if (alreadyExistingItemIndex < 0) {
                newSelectedItems.push(item);
            }
        });
        updateMediaGalleryField(selectedItems);
    }

    const updateMediaGalleryField = (items: Array<any>) => {
        setSelectedMediaItems(items);
        const fieldValues: any = {};
        if (fieldData.name) {
            fieldValues[fieldData.name] = items;
            formState.form?.setFieldsValue(fieldValues);
        }
    }

    if (fieldData.name && formState.hidden_field_names?.includes(fieldData.name)) {
        return null;
    }

    return (
        <>
            <Form.Item
                style={!!(fieldData.name && formState.invisible_field_names?.includes(fieldData.name)) ? {
                    display: 'none',
                } : undefined}
                wrapperCol={{ span: 20 }}
                name={fieldData.name}
                label={fieldData.label}
                initialValue={(fieldData.name && formState.initial_values && formState.initial_values[fieldData.name]) ? formState.initial_values[fieldData.name] : undefined}
                rules={[{ required: fieldData.is_required }]}>
                <>
                    {getSortableList()?.length > 0 && (
                        <ReactSortable
                            tag={CustomReactSortable}
                            animation={200}
                            list={getSortableList()}
                            setList={setSortableList}>
                            {getSortableList().map((mediaItem, mediaItemIndex) => (
                                <Col key={mediaItem.id} className="media-gallery-card-col" style={{ marginBottom: 16 }}>
                                    <Tooltip title={mediaItem.title} placement="bottom">
                                        <div className="media-gallery-card-wrapper" style={{ display: 'relative' }}>
                                            <Button
                                                style={{ height: 'auto', padding: 0 }}>
                                                <MediaGridItemContent
                                                    title={mediaItem.title}
                                                    pathName={mediaItem.path_name}
                                                    thumbnailPath={mediaItem.thumbnail_path ? mediaItem.thumbnail_path : mediaItem.path_name}
                                                    imageSize={216}
                                                />
                                            </Button>
                                            <Space
                                                className="media-gallery-card-hover"
                                                style={{
                                                    justifyContent: 'center',
                                                    position: 'absolute',
                                                    height: '100%',
                                                    width: '100%',
                                                    left: 0,
                                                    top: 0,
                                                }}>
                                                <Button
                                                    type="default"
                                                    shape="circle"
                                                    onClick={() => {
                                                        setPreviewItem({
                                                            src: mediaItem.path_name,
                                                            visible: true,
                                                        });
                                                    }}>
                                                    <EyeOutlined />
                                                </Button>
                                                <Button
                                                    type="default"
                                                    shape="circle"
                                                    onClick={() => {
                                                        setMediaItemConfigPath(mediaItem.path_name);
                                                    }}>
                                                    <SettingOutlined />
                                                </Button>
                                                <Button
                                                    type="default"
                                                    shape="circle"
                                                    danger={true}
                                                    onClick={() => {
                                                        let newSelectedMediaItems = [...getSortableList()];
                                                        newSelectedMediaItems.splice(mediaItemIndex, 1);
                                                        updateMediaGalleryField(newSelectedMediaItems);
                                                    }}>
                                                    <DeleteOutlined />
                                                </Button>
                                            </Space>
                                        </div>
                                    </Tooltip>
                                </Col>
                            ))}
                        </ReactSortable>
                    )}
                    <Button
                        style={{ marginBottom: 16 }}
                        icon={<FileImageOutlined />}
                        onClick={() => {
                            setIsMediaSelectorEnabled(true);
                        }}
                        disabled={fieldData.is_disabled || !!(fieldData.name && formState.disable_field_names?.includes(fieldData.name))}>
                        Add media images
                    </Button>
                    {isMediaSelectorEnabled && (
                        <MediaPanelComponent
                            initType={MEDIA_MANAGER_TYPE_MULTI_SELECT}
                            selectedMediaData={selectedMediaItems}
                            mediaPath={fieldData.upload_path ?? '/media'}
                            onSelectedDataChange={(items: Array<SelectedMediaItemInterface>) => {
                                handleMediaGalleryUpdate(items);
                            }}
                            onClose={() => {
                                setIsMediaSelectorEnabled(false);
                            }}
                        />
                    )}
                    {selectedMediaItems.length > 0 && mediaItemConfigPath && (
                        <FieldEditPanel
                            selectedMedia={selectedMediaItems.find((item) => item.path_name === mediaItemConfigPath)}
                            onClose={(title: string) => {
                                const newMediaItems = selectedMediaItems;
                                const selectedMediaItemIndex = newMediaItems.findIndex(
                                    (item) => item.path_name === mediaItemConfigPath
                                );
                                if (selectedMediaItemIndex !== -1) {
                                    newMediaItems[selectedMediaItemIndex].title = title;
                                }
                                handleMediaGalleryUpdate(newMediaItems);
                                setMediaItemConfigPath(undefined);
                            }}
                        />
                    )}
                    {previewItem ? (
                        <Image
                            width={0}
                            height={0}
                            style={{ display: 'none' }}
                            src={UrlHelper.buildImgUrlFromPath(previewItem.src)}
                            preview={{
                                src: UrlHelper.buildImgUrlFromPath(previewItem.src),
                                visible: previewItem.visible,
                                onVisibleChange: () => {
                                    setPreviewItem(undefined);
                                },
                            }}
                        />
                    ) : null}
                </>
            </Form.Item>
            {children}
        </>
    );
};

export default MediaImageGallerySelectorField;
