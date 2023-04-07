/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useCallback } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

interface FormMenuTabItem {
    label: string;
    path: string;
}

interface FormMenuTabComponentProps {
    tabData: Array<FormMenuTabItem>
}

const FormMenuTabComponent = ({ tabData }: FormMenuTabComponentProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getTabItems = useCallback(() => {
        const items: Array<any> = [];
        tabData.forEach((tab: any) => {
            items.push({
                label: tab.label,
                key: tab.path,
            });
        });
        return items;
    }, [tabData]);

    return (
        <div className="app-header-menu-tabs-panel">
            <Tabs
                defaultActiveKey={location.pathname}
                centered={true}
                onChange={(key: string) => navigate(key)}
                animated={false}
                style={{ paddingLeft: 16, paddingRight: 16 }}
                tabBarStyle={{
                    marginBottom: 0,
                }}
                items={getTabItems()}
            />
        </div>
    );
};

export default FormMenuTabComponent;
