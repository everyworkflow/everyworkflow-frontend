/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_AUTH, ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';
import Remote from '@everyworkflow/panel-bundle/service/remote';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import LoadingIndicatorComponent from '@everyworkflow/panel-bundle/component/loading-indicator-component';
import PanelConfig from '@everyworkflow/panel-bundle/config/panel-config';

const LoginPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSessionCleaningRequired, setIsSessionCleaningRequired] = useState(false);
    const [sessionToken, setSessionToken] = useState<string | undefined>(undefined);
    const authPrefixKey: string = PanelConfig.REACT_AUTH_PREFIX_KEY ?? 'ew_';
    const [loginFormData, setLoginFormData] = useState<any>({
        username: '',
        password: '',
    });
    const [sessionFormData, setSessionFormData] = useState<any>({
        session_name: 'Admin panel session',
    });

    useEffect(() => {
        if (!isLoggingIn) {
            panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Login page' });
        }
        (async () => {
            try {
                const authData: any = LocalStorage.get(authPrefixKey + 'auth');
                if (authData.token) {
                    panelDispatch({
                        type: ACTION_SET_AUTH,
                        payload: authData,
                    });
                } else {
                    setIsLoggingIn(false);
                }
            } catch (error: any) {
                setIsLoggingIn(false);
            }

            try {
                const sessionData: any = LocalStorage.get(authPrefixKey + 'session');
                const authData: any = LocalStorage.get(authPrefixKey + 'auth');
                if (sessionData && sessionData.hasOwnProperty('session_token') && authData) {
                    setSessionToken(sessionData.session_token);
                }
            } catch (error: any) { }
        })();
    }, [panelDispatch]);

    const onLoginClick = async () => {
        setLoading(true);
        const submitData: any = { ...loginFormData };

        const handlePostResponse = (response: any) => {
            if (response.session_token) {
                setSessionToken(response.session_token);
                LocalStorage.set(authPrefixKey + 'session', { session_token: response.session_token });
            }
            setLoading(false);
        };

        try {
            const response = await Remote.post('/login', submitData);
            handlePostResponse(response);
        } catch (error: any) {
            AlertAction({
                description: error.message,
                message: 'Submit error',
                type: ALERT_TYPE_ERROR,
            });
            setLoading(false);
        }
    };

    const onSessionContinueClick = async () => {
        setLoading(true);
        const submitData: any = {
            ...sessionFormData,
            session_token: sessionToken,
        };

        const handlePostResponse = (response: any) => {
            if (response.token) {
                LocalStorage.set(authPrefixKey + 'auth', response);
                AlertAction({
                    description: 'You have been successfully logged in.',
                    message: 'Login success',
                    type: ALERT_TYPE_SUCCESS,
                });
                panelDispatch({ type: ACTION_SET_AUTH, payload: response });
            }
            setLoading(false);
        };

        try {
            const response = await Remote.post('/login/session', submitData);
            handlePostResponse(response);
        } catch (error: any) {
            AlertAction({
                description: error.message,
                message: 'Submit error',
                type: ALERT_TYPE_ERROR,
            });
            setIsSessionCleaningRequired(true);
            setLoading(false);
        }
    };

    return (
        <>
            {isLoggingIn ? (
                <LoadingIndicatorComponent />
            ) : (
                <Row align="middle">
                    <Col flex={'420px'}>
                        <div style={{
                            padding: 24,
                        }}>
                            {sessionToken ? (
                                <>
                                    <h1>Start session</h1>
                                    <Form
                                        name="login_session_form"
                                        layout='vertical'
                                        onValuesChange={(data: any) => {
                                            const formData: any = { ...sessionFormData };
                                            Object.keys(data).forEach(name => {
                                                if (data[name]) {
                                                    formData[name] = data[name];
                                                }
                                            });
                                            setSessionFormData(formData);
                                        }}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Session name"
                                            name="session_name"
                                            initialValue={sessionFormData.session_name}
                                            rules={[{ required: true, message: 'Please input session name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                disabled={loading}
                                                loading={loading}
                                                onClick={onSessionContinueClick}
                                            >
                                                Continue
                                            </Button>
                                            {isSessionCleaningRequired && (
                                                <Button type="dashed" disabled={loading} onClick={() => {
                                                    LocalStorage.remove(authPrefixKey + 'session');
                                                    LocalStorage.remove(authPrefixKey + 'auth');
                                                    window.location.reload();
                                                }} style={{ marginLeft: 24 }}>Clear session</Button>
                                            )}
                                        </Form.Item>
                                    </Form>
                                </>
                            ) : (
                                <>
                                    <h1>Login page</h1>
                                    <Form
                                        name="login_form"
                                        layout='vertical'
                                        onValuesChange={(data: any) => {
                                            const formData: any = { ...loginFormData };
                                            Object.keys(data).forEach(name => {
                                                if (data[name]) {
                                                    formData[name] = data[name];
                                                }
                                            });
                                            setLoginFormData(formData);
                                        }}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            initialValue={loginFormData.username}
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            initialValue={loginFormData.password}
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                disabled={loading}
                                                loading={loading}
                                                onClick={onLoginClick}
                                            >
                                                Login
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </>
                            )}
                        </div>
                    </Col>
                    <Col flex={'auto'} style={{
                        backgroundColor: '#f0f2f5',
                        height: '100vh',
                        fontSize: 42,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 24,
                    }}>
                        <p>With great power comes great responsibility</p>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default LoginPage;
