/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect } from 'react';
import PanelContext from "@everyworkflow/panel-bundle/Context/PanelContext";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/Reducer/PanelReducer";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { ACTION_HIDE_FOOTER, ACTION_SHOW_FOOTER } from '@everyworkflow/admin-panel-bundle/Reducer/AdminPanelReducer';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/Context/AdminPanelContext';
import SettingSidebar from '@everyworkflow/setting-bundle/Admin/Page/SettingPage/SettingSidebar';
import SettingForm from '@everyworkflow/setting-bundle/Admin/Page/SettingPage/SettingForm';

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
        <div className="list-page-with-sidebar">
            <Row gutter={0}>
                <Col>
                    <SettingSidebar />
                </Col>
                <Col flex="auto" style={{ width: 'calc(100% - 420px)' }}>
                    <SettingForm />
                </Col>
            </Row>
        </div>
    );
};

export default SettingPage;
