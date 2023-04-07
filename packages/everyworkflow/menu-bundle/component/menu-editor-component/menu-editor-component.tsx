/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback, useEffect, useState } from 'react';
import { theme, Row, Col } from 'antd';
import MenuItemSidebar from "@everyworkflow/menu-bundle/component/menu-editor-component/menu-item-sidebar";
import MenuItemForm from "@everyworkflow/menu-bundle/component/menu-editor-component/menu-item-form";
import GetMenuAfterDrop, { DROP_TYPE_AFTER, DROP_TYPE_BEFORE, DROP_TYPE_INSIDE } from '@everyworkflow/menu-bundle/component/menu-editor-component/get-menu-after-drop';
import GetMenuAfterDelete from '@everyworkflow/menu-bundle/component/menu-editor-component/get-menu-after-delete';
import GetMenuAfterInsert from '@everyworkflow/menu-bundle/component/menu-editor-component/get-menu-after-insert';
import GetMenuAfterUpdate from '@everyworkflow/menu-bundle/component/menu-editor-component/get-menu-after-update';
import DataFormInterface from '@everyworkflow/data-form-bundle/model/data-form-interface';
import AlertAction, { ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';

interface MenuEditorComponentProps {
    initialMenuData: Array<any>;
    menuItemFormData?: DataFormInterface;
    onMenuDataChange?: (menuData: Array<any>) => void;
    onMenuSubmit?: (menuData: Array<any>) => void;
}

const MenuEditorComponent = ({ initialMenuData, menuItemFormData, onMenuDataChange, onMenuSubmit }: MenuEditorComponentProps) => {
    const { token } = theme.useToken();
    const [menuData, setMenuData] = useState<Array<any>>(initialMenuData);
    const [selectedItemIndex, setSelectedItemIndex] = useState<Array<number>>([]);
    const [insertConfig, setInsertConfig] = useState<{
        type: string,
        node: any,
    } | undefined>(undefined);

    useEffect(() => {
        if (onMenuDataChange) {
            onMenuDataChange(menuData);
        }
    }, [onMenuDataChange, menuData]);

    const selectedMenuItem = useCallback((): any => {
        if (selectedItemIndex.length === 0) {
            return undefined;
        }
        let selectedMenuItem: any = {
            children: menuData,
        };
        selectedItemIndex.forEach((index: number) => {
            if (selectedMenuItem.children[index]) {
                selectedMenuItem = selectedMenuItem.children[index];
            }
        });
        return selectedMenuItem;
    }, [menuData, selectedItemIndex]);

    const onMenuItemSubmit = (data: any) => {
        if (selectedItemIndex.length === 0) {
            if (insertConfig && insertConfig.type && insertConfig.node) {
                const newMenuData = GetMenuAfterInsert({
                    menuData: menuData,
                    dropdableItemData: data,
                    toIndexes: insertConfig.node.indexes,
                    dropType: insertConfig.type,
                });
                setMenuData([...newMenuData]);
                setSelectedItemIndex([]);
                return;
            } else {
                setMenuData([...menuData, data]);
                setSelectedItemIndex([]);
                return;
            }
        }
        const newMenuData = GetMenuAfterUpdate({
            menuData: menuData,
            dropdableItemData: data,
            toIndexes: selectedItemIndex,
        });
        setMenuData([...newMenuData]);
        AlertAction({
            message: 'Menu item changes saved temporarily.',
            type: ALERT_TYPE_SUCCESS,
        });
    };

    const onMenuItemTreeClick = (node: any) => {
        if (node.selected) {
            setSelectedItemIndex([]);
            setInsertConfig(undefined);
        } else {
            setSelectedItemIndex(node.indexes);
        }
    };

    const onMenuItemTreeDrop = (info: any) => {
        let dropType: string = DROP_TYPE_AFTER;
        if (info.dropToGap) {
            if (info.node.dragOverGapTop) {
                dropType = DROP_TYPE_BEFORE;
            }
        } else {
            dropType = DROP_TYPE_INSIDE;
        }
        const newMenuData: Array<any> = GetMenuAfterDrop({
            menuData: menuData,
            fromIndexes: info.dragNode.indexes,
            toIndexes: info.node.indexes,
            dropType: dropType,
        });
        setSelectedItemIndex([]);
        setMenuData([...newMenuData]);
        AlertAction({
            message: 'Menu item moved temporarily.',
            type: ALERT_TYPE_SUCCESS,
        });
    };

    const onTreeContextAction = (data: any) => {
        if (data.type === 'delete-item') {
            const newMenuData = GetMenuAfterDelete({
                menuData: menuData,
                fromIndexes: data.node.indexes,
            });
            setMenuData([...newMenuData]);
            setSelectedItemIndex([]);
            AlertAction({
                message: 'Menu item deleted temporarily.',
                type: ALERT_TYPE_SUCCESS,
            });
        } else if (data.type === 'add-new-item-below') {
            setInsertConfig({
                type: DROP_TYPE_AFTER,
                node: data.node,
            });
            setSelectedItemIndex([]);
        } else if (data.type === 'add-new-children-item') {
            setInsertConfig({
                type: DROP_TYPE_INSIDE,
                node: data.node,
            });
            setSelectedItemIndex([]);
        }
    };

    return (
        <>
            <div className="list-page-with-tree-sidebar" style={{
                marginBottom: 24,
                paddingLeft: token.paddingContentHorizontalLG,
                paddingRight: token.paddingContentHorizontalLG,
            }}>
                <Row gutter={24}>
                    <Col style={{ width: 444, minHeight: 'calc(100vh - 100px)' }}>
                        <div style={{
                            width: 420,
                            backgroundColor: token.colorBgBase,
                            borderRadius: 8,
                            padding: 8,
                            position: 'absolute',
                            minHeight: 'calc(100vh - 100px)'
                        }}>
                            <MenuItemSidebar
                                menuData={menuData}
                                onMenuItemTreeClick={onMenuItemTreeClick}
                                onMenuItemTreeDrop={onMenuItemTreeDrop}
                                onTreeContextAction={onTreeContextAction}
                            />
                        </div>
                    </Col>
                    <Col flex="auto">
                        <MenuItemForm
                            menuItemFormData={menuItemFormData}
                            insertConfig={insertConfig}
                            selectedMenuItem={selectedMenuItem()}
                            onSubmit={onMenuItemSubmit}
                            onDelete={() => {
                                const newMenuData = GetMenuAfterDelete({
                                    menuData: menuData,
                                    fromIndexes: selectedItemIndex,
                                });
                                setMenuData([...newMenuData]);
                                setSelectedItemIndex([]);
                                AlertAction({
                                    message: 'Menu item deleted temporarily.',
                                    type: ALERT_TYPE_SUCCESS,
                                });
                            }}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default MenuEditorComponent;
