/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import FrontPanelRoot from "@everyworkflow/front-panel-bundle/front-panel-root";
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';

const themes = {
    default: `/dist/css/style.css`,
    dark: `/dist/css/style.dark.css`,
};

const FrontPanel = () => {
    const getDefaultTheme = () => {
        const persistedTheme: string | undefined = LocalStorage.get('ew_theme', false);
        if (persistedTheme === 'dark') {
            return 'dark';
        }

        return 'default';
    }

    return (
        <ThemeSwitcherProvider defaultTheme={getDefaultTheme()} themeMap={themes}>
            <FrontPanelRoot />
        </ThemeSwitcherProvider>
    );
}

export default FrontPanel;
