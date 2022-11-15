/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import { ACTION_SET_PAGE_TITLE } from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import ScopeSidebar from '@everyworkflow/scope-bundle/page/scope-page/scope-sidebar';
import ScopeForm from '@everyworkflow/scope-bundle/page/scope-page/scope-form';
import AdminPanelContext from '@everyworkflow/admin-panel-bundle/context/admin-panel-context';
import { ACTION_HIDE_FOOTER, ACTION_SHOW_FOOTER } from '@everyworkflow/admin-panel-bundle/reducer/admin-panel-reducer';

const ScopePage = () => {
    const { dispatch: panelDispatch } = useContext(PanelContext);
    const { dispatch: adminPanelDispatch } = useContext(AdminPanelContext);
    const { code = 'default' }: any = useParams();

    useEffect(() => {
        panelDispatch({
            type: ACTION_SET_PAGE_TITLE,
            payload: code !== 'default' ? 'Edit scope' : 'Scope',
        });
        adminPanelDispatch({ type: ACTION_HIDE_FOOTER });
        return () => {
            adminPanelDispatch({ type: ACTION_SHOW_FOOTER });
        };
    }, [code]);

    return (
        <div className="list-page-with-tree-sidebar">
            <Row gutter={0}>
                <Col style={{ width: 420 }}>
                    <ScopeSidebar />
                </Col>
                <Col flex="auto" style={{ width: 'calc(100% - 420px)' }}>
                    <ScopeForm code={code} />
                </Col>
            </Row>
        </div>
    );
}

export default ScopePage;
