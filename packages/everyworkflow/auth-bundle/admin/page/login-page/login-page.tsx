/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useState } from 'react';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_AUTH, ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import DataFormComponent from '@everyworkflow/data-form-bundle/component/data-form-component';
import AlertAction, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '@everyworkflow/panel-bundle/action/alert-action';
import Remote from '@everyworkflow/panel-bundle/service/remote';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import LoadingIndicatorComponent from '@everyworkflow/panel-bundle/component/loading-indicator-component';
import PanelConfig from '@everyworkflow/panel-bundle/config/panel-config';

const loginFormData: any = {
    fields: [
        {
            label: 'Email',
            name: 'username',
            field_type: 'text_field',
            input_type: 'email',
            allow_clear: true
        },
        {
            label: 'Password',
            name: 'password',
            field_type: 'text_field',
            input_type: 'password',
            allow_clear: true
        }
    ],
};

const sessionFormData: any = {
    fields: [
        {
            label: 'Session name',
            name: 'session_name',
            field_type: 'text_field',
            allow_clear: true
        }
    ],
};

const LoginPage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSessionCleaningRequired, setIsSessionCleaningRequired] = useState(false);
    const [sessionToken, setSessionToken] = useState<string | undefined>();
    const [form] = Form.useForm();
    const authPrefixKey: string = PanelConfig.REACT_AUTH_PREFIX_KEY ?? 'ew_';

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
                const sessionData: any = LocalStorage.get('ew_session');
                const authData: any = LocalStorage.get(authPrefixKey + 'auth');
                if (sessionData && sessionData.hasOwnProperty('session_token') && authData) {
                    setSessionToken(sessionData.session_token);
                }
            } catch (error: any) { }
        })();
    }, [panelDispatch]);

    const onLoginSubmit = async (data: any) => {
        setLoading(true);
        const submitData: any = {};
        Object.keys(data).forEach(name => {
            if (data[name]) {
                submitData[name] = data[name];
            }
        });

        const handlePostResponse = (response: any) => {
            if (response.session_token) {
                setSessionToken(response.session_token);
                LocalStorage.set('ew_session', { session_token: response.session_token });
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

    const onSessionSubmit = async (data: any) => {
        setLoading(true);
        const submitData: any = {
            session_token: sessionToken,
        };
        Object.keys(data).forEach(name => {
            if (data[name]) {
                submitData[name] = data[name];
            }
        });

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
                                    <DataFormComponent
                                        formId={'start-session-form'}
                                        form={form}
                                        formData={sessionFormData}
                                        initialValues={{
                                            session_name: 'Not defined',
                                        }}
                                        onSubmit={onSessionSubmit}
                                    />
                                    <Button type="primary" disabled={loading} onClick={() => {
                                        form.submit();
                                    }}>Continue</Button>
                                    {isSessionCleaningRequired && (
                                        <Button type="dashed" disabled={loading} onClick={() => {
                                            LocalStorage.remove('ew_session');
                                            LocalStorage.remove(authPrefixKey + 'auth');
                                            window.location.reload();
                                        }} style={{ marginLeft: 24 }}>Clear session</Button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h1>Login page</h1>
                                    <DataFormComponent
                                        formId={'login-form'}
                                        form={form}
                                        formData={loginFormData}
                                        onSubmit={onLoginSubmit}
                                    />
                                    <Button type="primary" disabled={loading} onClick={() => {
                                        form.submit();
                                    }}>Login</Button>
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
