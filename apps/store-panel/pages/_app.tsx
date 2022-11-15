import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import HeaderComponent from "@everyworkflow/store-panel-bundle/component/header-component";
import FooterComponent from "@everyworkflow/store-panel-bundle/component/footer-component";
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../public/dist/css/theme.css';

library.add(fas);

const themes = {
    default: `/dist/css/theme.css`,
    dark: `/dist/css/dark-theme.css`,
};

function MyApp({ Component, pageProps }: AppProps) {
    const [currentTheme, setCurrentTheme] = useState<string>('default');

    useEffect(() => {
        const getDefaultTheme = () => {
            const persistedTheme: string | undefined = LocalStorage.get('ew_theme', false);
            if (persistedTheme === 'dark') {
                return 'dark';
            }
    
            return 'default';
        }
        setCurrentTheme(getDefaultTheme());
    }, []);

    return (
        <>
            <ThemeSwitcherProvider defaultTheme={currentTheme} themeMap={themes}>
                <HeaderComponent />
                <Component {...pageProps} />
                <FooterComponent />
            </ThemeSwitcherProvider>
        </>
    );
}

export default MyApp;
