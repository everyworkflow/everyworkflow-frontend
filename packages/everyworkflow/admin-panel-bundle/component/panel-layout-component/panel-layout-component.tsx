/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import { useClickAway } from "ahooks";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import AdminPanelContext from "@everyworkflow/admin-panel-bundle/context/admin-panel-context";
import {
    ACTION_HIDE_MOBILE_APP_SIDEBAR,
    ACTION_SET_SIDEBAR_DATA
} from "@everyworkflow/admin-panel-bundle/reducer/admin-panel-reducer";
import HeaderComponent from "@everyworkflow/admin-panel-bundle/component/header-component";
import FooterComponent from "@everyworkflow/admin-panel-bundle/component/footer-component";
import SidebarComponent from "@everyworkflow/admin-panel-bundle/component/sidebar-component";
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';

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
        <Layout>
            <Layout.Sider
                collapsible collapsed={isMainSidebarCollapsed} onCollapse={onMainSidebarCollapseClick}
                width={256}
                theme="light"
                style={{
                    zIndex: 2,
                }}>
                <div ref={sidebarRef}>
                    <div style={{
                        maxHeight: 'calc(100vh - 48px)',
                        position: 'fixed',
                        width: 256,
                    }}>
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
