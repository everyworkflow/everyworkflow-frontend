/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useState, useRef } from "react";
import { theme, Card, Space, Button, Popconfirm } from "antd";
import { useDrop } from "ahooks";
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import AttributeItem from "@everyworkflow/eav-bundle/section/attribute-group-section/attribute-item";
import AttributeSectionItemForm from "@everyworkflow/eav-bundle/section/attribute-group-section/attribute-section-item-form";
import FormContext from "@everyworkflow/data-form-bundle/context/form-context";

interface AttributeSectionItemProps {
    data: Array<any>;
    item: any;
    onChange: (newGroupData: Array<any>) => void;
}

const AttributeSectionItem = ({ data, item, onChange }: AttributeSectionItemProps) => {
    const { token } = theme.useToken();
    const { state: formState } = useContext(FormContext);
    const dropRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [addNewSection, setAddNewSection] = useState<boolean>(false);

    useDrop(dropRef, {
        onText: (text: string) => {
            const droppedItem = JSON.parse(text);
            if (droppedItem?.code) {
                const currentData: Array<any> = JSON.parse(JSON.stringify(data));
                currentData.forEach((section: any) => {
                    if (section?.code !== item?.code) {
                        section.attributes = section.attributes ?? [];
                        const currentValIndex = section?.attributes?.indexOf(droppedItem.code);
                        if (currentValIndex > -1) {
                            section.attributes.splice(currentValIndex, 1);
                            if (typeof section.attributes === 'object') {
                                section.attributes = Object.values(section.attributes);
                            }
                        }
                        console.log('ondrop-text-currentValIndex', currentValIndex, section?.attributes, droppedItem.code);
                    }
                });
                const currentItem = currentData.find((section: any) => section.code === item.code);
                if (currentItem) {
                    currentItem.attributes = currentItem.attributes ?? [];
                    if (!currentItem?.attributes?.includes(droppedItem.code)) {
                        currentItem.attributes.push(droppedItem.code);
                        onChange(currentData);
                    }
                }
            }
            setIsHovering(false);
        },
        onDragEnter: () => setIsHovering(true),
        onDragLeave: () => setIsHovering(false),
    });

    return (
        <Card
            title={(
                <>
                    <span>{item?.sort_order ?? 0}</span>
                    <span>. </span>
                    <span>{item?.name ?? 'undefined'}</span>
                </>
            )}
            style={{
                marginBottom: token.size,
            }}
            bodyStyle={{
                padding: 0,
            }}
            extra={(
                <Space>
                    <Button
                        type="ghost"
                        shape="circle"
                        icon={<SettingOutlined />}
                        onClick={() => {
                            setAddNewSection(true);
                        }} />
                    <Popconfirm
                        placement="topRight"
                        overlayClassName="attribute-group-section-action-confirm"
                        title={"Are you sure to delete this section?"}
                        onConfirm={() => {
                            const currentData: Array<any> = [...data];
                            const currentValIndex = currentData.indexOf(item);
                            if (currentValIndex > -1) {
                                currentData.splice(currentValIndex, 1);
                                onChange(currentData);
                            }
                        }}
                        okText="Yes"
                        cancelText="No">
                        <Button
                            type="ghost"
                            shape="circle"
                            danger={true}
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )}>
            <div
                ref={dropRef}
                style={{
                    padding: token.sizeXL,
                    position: 'relative',
                    minHeight: token.sizeXL * 5,
                }}>
                {formState.form_data?.additional_data?.attributes
                    ?.filter((attribute: any) => item?.attributes?.includes(attribute?.code))
                    ?.sort((a: any, b: any) => a?.sort_order - b?.sort_order)
                    ?.map((attribute: any, index: number) => (
                        <AttributeItem
                            key={index}
                            item={attribute}
                            canRemove={true}
                            onRemoveClick={(removeItem: any) => {
                                const currentData: Array<any> = [...data];
                                const currentItem = currentData.find((section: any) => section.code === item.code);
                                if (currentItem) {
                                    currentItem.attributes = currentItem.attributes ?? [];
                                    const currentValIndex = currentItem.attributes.indexOf(removeItem.code);
                                    if (currentValIndex > -1) {
                                        currentItem.attributes.splice(currentValIndex, 1);
                                        onChange(currentData);
                                    }
                                }
                            }} />
                    ))}
                {addNewSection && (
                    <AttributeSectionItemForm
                        item={item}
                        onSave={(saveItem) => {
                            const currentData: Array<any> = [...data];
                            const currentItemIndex = currentData.findIndex((section: any) => section.code === saveItem.code);
                            if (currentItemIndex > -1) {
                                let currentItem: any = currentData[currentItemIndex];
                                currentItem = { ...currentItem, ...saveItem };
                                currentData[currentItemIndex] = currentItem;
                            } else {
                                currentData.push(saveItem);
                            }
                            onChange(currentData);
                            setAddNewSection(false);
                        }}
                        onClose={() => {
                            setAddNewSection(false);
                        }} />
                )}
                {(isHovering || !item?.attributes?.length) && (
                    <div
                        style={{
                            borderRadius: token.borderRadius,
                            border: isHovering ? 'solid 1px ' + token.colorPrimaryHover : 'dashed 1px ' + token.colorTextDisabled,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            display: 'flex',
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            left: 0,
                            top: 0,
                        }}>
                        <span>{isHovering ? 'Drop here' : 'Drag attribute card from left sidebar and drop here.'}</span>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default AttributeSectionItem;
