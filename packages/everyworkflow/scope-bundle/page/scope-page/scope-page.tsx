/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { theme, Row, Col, Form } from 'antd';
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import ScopeSidebar from '@everyworkflow/scope-bundle/page/scope-page/scope-sidebar';
import ScopeForm from '@everyworkflow/scope-bundle/page/scope-page/scope-form';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/context/admin-panel-context';
import { ACTION_HIDE_FOOTER, ACTION_SHOW_FOOTER } from '@everyworkflow/admin-panel-bundle/reducer/admin-panel-reducer';
import PageHeaderComponent from '@everyworkflow/admin-panel-bundle/component/page-header-component';

const ScopePage = () => {
    const { token } = theme.useToken();
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const { dispatch: adminPanelDispatch } = useContext(AdminPanelContext);
    const { code = 'default' }: any = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        panelDispatch({
            type: ACTION_SET_PAGE_TITLE,
            payload: 'Scope',
        });
        adminPanelDispatch({ type: ACTION_HIDE_FOOTER });
        return () => {
            adminPanelDispatch({ type: ACTION_SHOW_FOOTER });
        };
    }, [code]);

    return (
        <>
            <PageHeaderComponent
                title={code !== 'default' ? `Code: ${code}` : 'Create new scope'}
                actions={[
                    {
                        button_label: 'Save changes',
                        button_type: 'primary',
                        onClick: () => {
                            form?.submit();
                        },
                    }
                ]}
                style={{ marginBottom: 24 }}
            />
            <div className="list-page-with-tree-sidebar" style={{
                marginBottom: 24,
                paddingLeft: token.paddingContentHorizontalLG,
                paddingRight: token.paddingContentHorizontalLG,
            }}>
                <Row gutter={24}>
                    <Col style={{ width: 444, minHeight: 'calc(100vh - 100px)' }}>
                        <div style={{
                            width: 420,
                            backgroundColor: token.colorBgBase,
                            borderRadius: 8,
                            padding: 8,
                            position: 'absolute',
                            minHeight: 'calc(100vh - 100px)'
                        }}>
                            <ScopeSidebar />
                        </div>
                    </Col>
                    <Col flex="auto">
                        <ScopeForm code={code} form={form} />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ScopePage;
