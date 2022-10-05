import React, {useCallback, useEffect, useState} from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Alert from 'antd/lib/alert';
import Badge from 'antd/lib/badge';
import BellOutlined from '@ant-design/icons/BellOutlined';
import Button from 'antd/lib/button';
import IndexedDb from '@everyworkflow/panel-bundle/Service/IndexedDb';
import ReactTimeago from 'react-timeago';

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

    return (
        <>
            <Dropdown
                overlay={(
                    <div className="app-notification-panel-overlay">
                        <div className="notification-header">
                            <Badge count={notificationCount} />
                            <Button type="default" size="small" onClick={clearAllHandler}>Clear All</Button>
                        </div>
                        {notificationCount === 0 ? (
                            <div style={{
                                padding: '16px 24px',
                            }}>No new notification</div>
                        ) : (
                                <div className="notification-body">
                                    {alertData.map((alert: any, index: number) => (
                                        <div key={index} className="notification-item">
                                            <Alert
                                                message={alert.message}
                                                description={alert.description}
                                                type={alert.type?.replace('alert_type_', '')}
                                                />
                                            <div className="notification-item-footer">
                                                <ReactTimeago date={alert.date} live={false} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                )} 
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

