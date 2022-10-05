/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useState } from 'react';
import Drawer from 'antd/lib/drawer';
import { useResponsive } from "ahooks";
import { Scrollbars } from 'react-custom-scrollbars';

export const PANEL_SIZE_FULL = 'panel_full_size'; // default
export const PANEL_SIZE_HALF = 'panel_half_size'; // default
export const PANEL_SIZE_SMALL = 'panel_small_size';
export const PANEL_SIZE_MEDIUM = 'panel_medium_size';

export const PANEL_FROM_RIGHT = 'right'; // default
export const PANEL_FROM_LEFT = 'left';
export const PANEL_FROM_TOP = 'top';
export const PANEL_FROM_BOTTOM = 'bottom';

interface SidePanelComponentProps {
    children?: JSX.Element | JSX.Element[];
    title?: React.ReactNode;
    extra?: React.ReactNode;
    size?: string;
    fromDirection?: any;
    panelZIndex?: number;
    closeIcon?: React.ReactNode;
    style?: React.CSSProperties;
    drawerStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties
    bodyStyle?: React.CSSProperties;
    onClose?: () => void;
    footer?: React.ReactNode;
    footerStyle?: React.CSSProperties;
    scrollBarStyle?: React.CSSProperties;
}

const SidePanelComponent = ({
    children,
    title,
    extra,
    size,
    fromDirection,
    panelZIndex,
    closeIcon,
    style,
    drawerStyle,
    headerStyle,
    bodyStyle,
    onClose,
    footer,
    footerStyle,
    scrollBarStyle
}: SidePanelComponentProps) => {
    const responsive = useResponsive();
    const [visible, setVisible] = useState(true);

    const onComponentClose = () => {
        setVisible(false);
        if (onClose) {
            onClose();
        }
    };

    const getPanelSize = () => {
        if (!responsive.md) {
            return '84%';
        }
        switch (size) {
            case PANEL_SIZE_HALF: {
                return '50%';
            }
            case PANEL_SIZE_MEDIUM: {
                return '450px';
            }
            case PANEL_SIZE_SMALL: {
                return '264px';
            }
            default: {
                return 'calc(100% - 200px)';
            }
        }
    };

    return (
        <>
            <Drawer
                closeIcon={closeIcon}
                style={style}
                drawerStyle={drawerStyle}
                headerStyle={{ padding: 16, paddingRight: 24, ...headerStyle }}
                bodyStyle={{ padding: 0 }}
                title={title}
                extra={extra}
                placement={fromDirection ?? PANEL_FROM_RIGHT}
                onClose={onComponentClose}
                open={visible}
                width={getPanelSize()}
                zIndex={panelZIndex ?? 1001}
                footer={footer}
                footerStyle={footerStyle}>
                <Scrollbars
                    autoHide={true}
                    style={{
                        height: footer ? 'calc(100vh - 108px)' : 'calc(100vh - 57px)',
                        ...scrollBarStyle
                    }}>
                    <div style={{ padding: 24, ...bodyStyle }}>
                        {children}
                    </div>
                </Scrollbars>
            </Drawer>
        </>
    );
};

export default SidePanelComponent;
