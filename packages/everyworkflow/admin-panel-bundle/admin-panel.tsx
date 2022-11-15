/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import AdminPanelRoot from "@everyworkflow/admin-panel-bundle/admin-panel-root";
import RootPanelComponent from '@everyworkflow/panel-bundle/component/root-panel-component';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';

const themes = {
    default: `/dist/css/style.css`,
    dark: `/dist/css/style.dark.css`,
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
