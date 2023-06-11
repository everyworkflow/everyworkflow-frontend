/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect, useState } from 'react';
import { theme, Row, Col, Form } from "antd";
import { useParams } from 'react-router-dom';
import Remote from "@everyworkflow/panel-bundle/service/remote";
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import { ACTION_HIDE_FOOTER, ACTION_SHOW_FOOTER } from '@everyworkflow/admin-panel-bundle/reducer/admin-panel-reducer';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/context/admin-panel-context';
import AlertAction, { ALERT_TYPE_ERROR } from "@everyworkflow/panel-bundle/action/alert-action";
import HttpError from '@everyworkflow/panel-bundle/error/http-error';
import SettingSidebar from '@everyworkflow/setting-bundle/admin/page/setting-page/setting-sidebar';
import SettingForm from '@everyworkflow/setting-bundle/admin/page/setting-page/setting-form';
import PageHeaderComponent from '@everyworkflow/admin-panel-bundle/component/page-header-component';
import LoadingIndicatorComponent from '@everyworkflow/panel-bundle/component/loading-indicator-component';
import Error404Component from '@everyworkflow/panel-bundle/component/error-404-component';

const SettingPage = () => {
    const { token } = theme.useToken();
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const { dispatch: adminPanelDispatch } = useContext(AdminPanelContext);
    const [remoteStatus, setRemoteStatus] = useState<number | undefined>();
    const [remoteData, setRemoteData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const { code }: any = useParams();

    useEffect(() => {
        panelDispatch({ type: ACTION_SET_PAGE_TITLE, payload: 'Setting' });
        adminPanelDispatch({ type: ACTION_HIDE_FOOTER });
        return () => {
            adminPanelDispatch({ type: ACTION_SHOW_FOOTER });
        };
    }, [panelDispatch]);

    useEffect(() => {
        const handleResponse = (response: any) => {
            if (remoteData) {
                form.resetFields();
            }
            setRemoteData(response);
            setLoading(false);
        };

        (async () => {
            try {
                const currentSettingCode = code ?? 'general-setting';
                setLoading(true);
                const response: any = await Remote.get('/setting/' + currentSettingCode + '?for=data-form');
                handleResponse(response);
                setRemoteStatus(200);
            } catch (error: any) {
                if (error instanceof HttpError) {
                    setRemoteStatus(error.status);
                }
                AlertAction({
                    description: error.message,
                    message: 'Fetch error',
                    type: ALERT_TYPE_ERROR,
                });
                setLoading(false);
            }
        })();
    }, [code]);

    return (
        <>
            <PageHeaderComponent
                title={remoteData?.label ?? 'Setting'}
                actions={remoteData ? [
                    {
                        button_label: 'Save changes',
                        button_type: 'primary',
                        onClick: () => {
                            form?.submit();
                        },
                    }
                ] : undefined}
                style={{ marginBottom: 24 }}
            />
            <div
                className="list-page-with-tree-sidebar"
                style={{
                    marginBottom: token.paddingContentHorizontalLG,
                    paddingLeft: token.paddingContentHorizontalLG,
                    paddingRight: token.paddingContentHorizontalLG,
                }}>
                <Row gutter={24}>
                    <Col
                        style={{
                            width: 444,
                            minHeight: 'calc(100vh - 100px)',
                        }}>
                        <div style={{
                            backgroundColor: token.colorBgContainer,
                            boxShadow: token.boxShadowTertiary,
                            minHeight: 'calc(100vh - 100px)',
                            position: 'absolute',
                            borderRadius: 8,
                            padding: 8,
                            width: 420,
                        }}>
                            <SettingSidebar />
                        </div>
                    </Col>
                    <Col flex="auto">
                        {loading && <LoadingIndicatorComponent />}
                        {(remoteData && !loading && remoteStatus === 200) && (
                            <SettingForm
                                code={code}
                                form={form}
                                remoteData={remoteData}
                            />
                        )}
                        {remoteStatus === 404 && (
                            <Error404Component />
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default SettingPage;
