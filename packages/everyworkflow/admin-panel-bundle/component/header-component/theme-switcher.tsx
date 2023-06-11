/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';
import { ACTION_SET_THEME } from '@everyworkflow/panel-bundle/reducer/panel-reducer';

const ThemeSwitcher = () => {
    const { state: panelState, dispatch: panelDispatch } = useContext(PanelContext);

    const toggleDarkMode = () => {
        const nextTheme = panelState.theme === 'light' ? 'dark' : 'light';
        LocalStorage.set('ew_theme', nextTheme);
        panelDispatch({
            type: ACTION_SET_THEME,
            payload: nextTheme,
        });
    }

    return (
        <div onClick={toggleDarkMode}>Theme: {panelState.theme === 'light' ? 'Light' : 'Dark'}</div>
    );
}

export default ThemeSwitcher;
