/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React from 'react';
import AdminPanelRoot from "@everyworkflow/admin-panel-bundle/AdminPanelRoot";
import RootPanelComponent from '@everyworkflow/panel-bundle/Component/RootPanelComponent';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import LocalStorage from '@everyworkflow/panel-bundle/Service/LocalStorage';

const themes = {
    default: `/dist/css/theme.css`,
    dark: `/dist/css/dark-theme.css`,
};

const AdminPanel = () => {
    const getDefaultTheme = () => {
        const persistedTheme: string | undefined = LocalStorage.get('ew_theme', false);
        if (persistedTheme === 'dark') {
            return 'dark';
        }

        return 'default';
    }


    return (
        <ThemeSwitcherProvider defaultTheme={getDefaultTheme()} themeMap={themes}>
            <RootPanelComponent>
                <AdminPanelRoot />
            </RootPanelComponent>
        </ThemeSwitcherProvider>
    );
}

export default AdminPanel;
