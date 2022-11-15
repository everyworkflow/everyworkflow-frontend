/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState, useEffect } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';

const ThemeSwitcher = () => {
    const { switcher, themes, currentTheme, status } = useThemeSwitcher();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const persistedTheme: string | undefined = LocalStorage.get('ew_theme', false);
        if (persistedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, [])

    if (status === 'loading') {
        return <span>Loading...</span>;
    }

    const toggleDarkMode = () => {
        const nextTheme = currentTheme === 'default' ? themes.dark : themes.default;
        switcher({ theme: nextTheme });
        setIsDarkMode(nextTheme === themes.dark);
        LocalStorage.set('ew_theme', nextTheme, false);
    }

    return (
        <div onClick={toggleDarkMode}>Theme: {isDarkMode ? 'Dark' : 'Light'}</div>
    );
}

export default ThemeSwitcher;
