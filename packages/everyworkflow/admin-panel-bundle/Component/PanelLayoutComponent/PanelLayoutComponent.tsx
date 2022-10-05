/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from 'antd/lib/layout';
import Remote from "@everyworkflow/panel-bundle/Service/Remote";
import AdminPanelContext from "@everyworkflow/admin-panel-bundle/Context/AdminPanelContext";
import {
    ACTION_HIDE_MOBILE_APP_SIDEBAR,
    ACTION_SET_SIDEBAR_DATA
} from "@everyworkflow/admin-panel-bundle/Reducer/AdminPanelReducer";
import HeaderComponent from "@everyworkflow/admin-panel-bundle/Component/HeaderComponent";
import FooterComponent from "@everyworkflow/admin-panel-bundle/Component/FooterComponent";
import SidebarComponent from "@everyworkflow/admin-panel-bundle/Component/SidebarComponent";
import { useClickAway } from "ahooks";
import LocalStorage from '@everyworkflow/panel-bundle/Service/LocalStorage';

interface PanelLayoutComponentProps {
    children?: JSX.Element | JSX.Element[];
}

const PanelLayoutComponent = ({ children }: PanelLayoutComponentProps) => {
    const { state, dispatch } = useContext(AdminPanelContext);
    const [isPanelLoaded, setPanelLoaded] = useState(false);
    const [isMainSidebarCollapsed, setIsMainSidebarCollapsed] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const persistedIsSidebarCollapsed: string | undefined = LocalStorage.get('is_main_sidebar_collapsed', false);
        if (persistedIsSidebarCollapsed === 'true') {
            setIsMainSidebarCollapsed(true);
        }

        try {
            (async () => {
                const response = await Remote.get('/admin-panel/layout');
                if (response.panel_sidebar) {
                    dispatch({
                        type: ACTION_SET_SIDEBAR_DATA,
                        payload: response.panel_sidebar.sidebar_data,
                    });
                    setPanelLoaded(true);
                }
            })();
        } catch (error) {
            console.log('PanelLayoutComponent-error', error);
        }
    }, [dispatch]);

    const onMainSidebarCollapseClick = (value: boolean) => {
        LocalStorage.set('is_main_sidebar_collapsed', value, false);
        setIsMainSidebarCollapsed(value);
    }

    useClickAway(() => {
        if (state.show_mobile_app_sidebar) {
            dispatch({ type: ACTION_HIDE_MOBILE_APP_SIDEBAR });
        }
    }, [sidebarRef, () => document.getElementById('btn-app-main-menu')]);

    return (
        <Layout className="layout">
            <Layout.Sider
                collapsible collapsed={isMainSidebarCollapsed} onCollapse={onMainSidebarCollapseClick}
                className={state.show_mobile_app_sidebar ? 'app-main-side-panel active-mobile' : 'app-main-side-panel'}
                width={256}
                theme="light">
                <div ref={sidebarRef}>
                    <div className="app-sidebar-wrapper">
                        <SidebarComponent />
                    </div>
                </div>
            </Layout.Sider>
            <Layout.Content style={state.show_mobile_app_sidebar ? {
                height: '100vh',
                overflow: 'hidden',
            } : undefined}>
                <HeaderComponent />
                <div style={{
                    minHeight: 'calc(100vh - 62px)',
                    // paddingBottom: 24,
                }}>
                    {isPanelLoaded && children}
                </div>
                {!state.hide_footer && <FooterComponent />}
            </Layout.Content>
        </Layout>
    );
};

export default PanelLayoutComponent;
