/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useRef, useState } from "react";
import { theme, Card, Space, Popconfirm, Button, Tag } from 'antd';
import { useDrag } from "ahooks";
import { DeleteOutlined } from '@ant-design/icons';

interface AttributeItemProps {
    item: any;
    canRemove?: boolean;
    onRemoveClick?: (item: any) => void;
}

const AttributeItem = ({ item, canRemove, onRemoveClick }: AttributeItemProps) => {
    const { token } = theme.useToken();
    const dragRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);

    useDrag(item, dragRef, {
        onDragStart: () => {
            setDragging(true);
        },
        onDragEnd: () => {
            setDragging(false);
        },
    });


    return (
        <Card
            ref={dragRef}
            size="small"
            style={{
                cursor: 'move',
                marginBottom: token.size,
                borderColor: dragging ? token.colorPrimary : undefined,
            }}
            title={item?.name}
            extra={canRemove ? (
                <Space>
                    <Popconfirm
                        placement="topRight"
                        overlayClassName="attribute-group-section-action-confirm"
                        title={"Are you sure to delete this attribute from section?"}
                        onConfirm={() => {
                            if (onRemoveClick) {
                                onRemoveClick(item);
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
            ) : undefined}>
            <Space>
                <Tag>Code: {item?.code}</Tag>
                <Tag>Type: {item?.type}</Tag>
            </Space>
        </Card>
    )
}

export default AttributeItem;
