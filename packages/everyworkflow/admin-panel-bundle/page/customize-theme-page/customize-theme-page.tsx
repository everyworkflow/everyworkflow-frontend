/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useEffect, useContext, useState } from 'react';
import { theme, Card, Space, Button, Row, Col } from 'antd';
import { ACTION_SET_PAGE_TITLE, ACTION_SET_THEME, ACTION_SET_THEME_TOKEN } from '@everyworkflow/panel-bundle/reducer/panel-reducer';
import PanelContext from '@everyworkflow/panel-bundle/context/panel-context';
import LightThemePreview from '@everyworkflow/admin-panel-bundle/page/customize-theme-page/light-theme-preview';
import DarkThemePreview from '@everyworkflow/admin-panel-bundle/page/customize-theme-page/dark-theme-preview';
import { primaryColorData } from '@everyworkflow/admin-panel-bundle/page/customize-theme-page/primary-color-data';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';

const CustomizeThemePage = () => {
    const { token } = theme.useToken();
    const { state: panelState, dispatch: panelDispatch } = useContext(PanelContext);
    const [currentTheme, setCurrentTheme] = useState(panelState.theme);
    const [currentThemeToken, setCurrentThemeToken] = useState<any>(panelState.theme_token ?? {
        colorPrimary: 'blue',
    });

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Customize Theme' });
    }, [panelDispatch])

    const handleThemeChange = (selectedTheme: string) => {
        setCurrentTheme(selectedTheme);
        LocalStorage.set('ew_theme', selectedTheme);
        panelDispatch({
            type: ACTION_SET_THEME,
            payload: selectedTheme,
        });
    }

    const handleThemeTokenChange = (tokenCode: string, selectedValue: string) => {
        let themeToken: any = { ...currentThemeToken };
        themeToken[tokenCode] = selectedValue;
        setCurrentThemeToken(themeToken);
        LocalStorage.set('ew_theme_token', themeToken);
        panelDispatch({
            type: ACTION_SET_THEME_TOKEN,
            payload: themeToken,
        });
    }

    return (
        <div style={{
            padding: token.paddingContentHorizontalLG,
        }}>
            <Card title={'My Theme'}>
                <Row style={{
                    marginBottom: token.paddingContentHorizontalLG,
                }}>
                    <Col span="4">
                        <span>Theme:</span>
                    </Col>
                    <Col>
                        <Space>
                            <div>
                                <Card
                                    style={{
                                        border: (currentTheme === 'light') ? 'solid 4px ' + token.colorPrimary : 'solid 4px transparent',
                                        cursor: 'pointer',
                                    }}
                                    bodyStyle={{
                                        padding: 0,
                                    }}
                                    onClick={() => {
                                        handleThemeChange('light');
                                    }}>
                                    <LightThemePreview />
                                </Card>
                                <div style={{ textAlign: 'center' }}>Light</div>
                            </div>
                            <div>
                                <Card
                                    style={{
                                        border: currentTheme === 'dark' ? 'solid 4px ' + token.colorPrimary : 'solid 4px transparent',
                                        cursor: 'pointer',
                                    }}
                                    bodyStyle={{
                                        padding: 0,
                                    }}
                                    onClick={() => {
                                        handleThemeChange('dark');
                                    }}>
                                    <DarkThemePreview />
                                </Card>
                                <div style={{ textAlign: 'center' }}>Dark</div>
                            </div>
                        </Space>
                    </Col>
                </Row>
                <Row style={{
                    marginBottom: token.paddingContentHorizontalLG,
                }}>
                    <Col span="4">
                        <span>Primary color:</span>
                    </Col>
                    <Col>
                        <Space>
                            {primaryColorData.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    style={{
                                        border: currentThemeToken.colorPrimary === item.code ? 'solid 2px ' + token.colorPrimary : 'solid 2px transparent',
                                        borderRadius: '100%',
                                        padding: 2,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        handleThemeTokenChange('colorPrimary', item.code);
                                    }}
                                    title={item.label}>
                                    <div style={{
                                        height: 24,
                                        width: 24,
                                        borderRadius: '100%',
                                        ...item.style,
                                    }}></div>
                                </div>
                            ))}
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default CustomizeThemePage;
