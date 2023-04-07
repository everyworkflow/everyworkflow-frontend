/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { Row, Col } from "antd";
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import { ACTION_HIDE_FOOTER, ACTION_SHOW_FOOTER } from '@everyworkflow/admin-panel-bundle/reducer/admin-panel-reducer';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/context/admin-panel-context';
import SettingSidebar from '@everyworkflow/setting-bundle/admin/page/setting-page/setting-sidebar';
import SettingForm from '@everyworkflow/setting-bundle/admin/page/setting-page/setting-form';

const SettingPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const { dispatch: adminPanelDispatch } = useContext(AdminPanelContext);

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Setting' });
        adminPanelDispatch({ type: ACTION_HIDE_FOOTER });
        return () => {
            adminPanelDispatch({ type: ACTION_SHOW_FOOTER });
        };
    }, [panelDispatch]);

    return (
        <div className="list-page-with-sidebar" style={{ paddingRight: 24 }}>
            <Row gutter={24}>
                <Col style={{ flexShrink: 1 }}>
                    <SettingSidebar />
                </Col>
                <Col flex="auto">
                    <SettingForm />
                </Col>
            </Row>
        </div>
    );
};

export default SettingPage;
