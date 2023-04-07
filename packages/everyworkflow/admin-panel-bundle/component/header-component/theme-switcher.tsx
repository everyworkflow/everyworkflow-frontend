/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState, useEffect } from 'react';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const persistedTheme: string | undefined = LocalStorage.get('ew_theme', false);
        if (persistedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, [])

    const toggleDarkMode = () => {
        const currentTheme = LocalStorage.get('ew_theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        setIsDarkMode(nextTheme === 'light');
        LocalStorage.set('ew_theme', nextTheme, false);
    }

    return (
        <div onClick={toggleDarkMode}>Theme: {isDarkMode ? 'Dark' : 'Light'}</div>
    );
}

export default ThemeSwitcher;
