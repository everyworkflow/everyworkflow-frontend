/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useEffect, useState } from 'react';
import { Alert, Dropdown, Badge, Button, Space } from 'antd';
import BellOutlined from '@ant-design/icons/BellOutlined';
import ReactTimeago from 'react-timeago';
import IndexedDb from '@everyworkflow/panel-bundle/service/indexed-db';

const NotificationDropdown = () => {
    const [alertData, setAlertData]: Array<any> = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const loadAlertData = async () => {
        const panelDb = await IndexedDb.getDb('panel', 'alert_history');
        panelDb.getAll('alert_history').then(alertData => {
            setAlertData([...alertData.reverse()]);
            setNotificationCount(alertData.length);
        }).catch((error: any) => { });
    }

    useEffect(() => {
        loadAlertData();
    }, []);

    const clearAllHandler = async () => {
        const panelDb = await IndexedDb.getDb('panel', 'alert_history');
        panelDb.clear('alert_history').catch((error: any) => { });
        setAlertData([]);
        setNotificationCount(0);
    }

    const getMenu = () => {
        const menu: any = {
            style: {
                maxHeight: '80vh',
                overflow: 'auto',
            },
            items: [
                {
                    label: (
                        <Space style={{
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '4px 0',
                        }}>
                            <Badge count={notificationCount} />
                            <Button type="default" size="small" onClick={clearAllHandler}>Clear All</Button>
                        </Space>
                    ),
                    type: 'group',
                    key: 'notification-menu-1',
                },
            ]
        };

        if (notificationCount === 0) {
            menu.items.push({
                label: (
                    <div style={{
                        padding: '16px 24px',
                    }}>No new notification</div>
                ),
                type: 'group',
                key: 'no-new-notification',
            });
        } else {
            alertData.map((alert: any, index: number) => {
                menu.items.push({
                    label: (
                        <div key={index}>
                            <Alert
                                message={alert.message}
                                description={alert.description}
                                type={alert.type?.replace('alert_type_', '')}
                            />
                            <small>
                                <ReactTimeago date={alert.date} live={false} />
                            </small>
                        </div>
                    ),
                    type: 'group',
                    key: 'notification-item-key-' + index,
                });
            });
        }

        return menu;
    }

    return (
        <>
            <Dropdown
                menu={getMenu()}
                trigger={['click']}>
                <Button
                    icon={<BellOutlined />}
                    type="default"
                    shape="circle"
                    onClick={() => {
                        loadAlertData();
                    }}
                />
            </Dropdown>
        </>
    );
}

export default NotificationDropdown;

