/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useCallback } from 'react';
import Menu from "antd/lib/menu";
import { Link, NavLink, useLocation } from 'react-router-dom';

const MainMenuComponent = () => {
    const location = useLocation();
    console.log('MainMenuComponent - location -->', location);

    const getMenuItems = useCallback((): Array<any> => {
        let items: Array<any> = [];
        items.push({
            key: '/',
            className: 'brand-home',
            style: {
                borderColor: 'transparent',
                paddingLeft: 0,
            },
            label: (
                <Link to={'/'}>
                    <img src={'/media/ew-logo.svg'} alt={'Logo'} />
                </Link>
            ),
        });
        items.push({
            key: '/resources',
            label: 'Resources',
            children: [
                {
                    key: 'resources1',
                    label: 'User documentation',
                },
                {
                    key: 'resources2',
                    label: 'Frontend documentation',
                },
                {
                    key: 'resources3',
                    label: 'Backend documentation',
                },
                {
                    key: 'resources4',
                    label: 'API documentation',
                },
                {
                    key: 'resources5',
                    label: 'Research and development',
                },
            ],
        });
        items.push({
            key: '/marketplace',
            label: 'Marketplace',
        });
        items.push({
            key: '/community',
            label: 'Community',
        });
        items.push({
            key: '/about',
            label: (
                <Link to={'/about'}>About</Link>
            ),
        });
        items.push({
            key: '/contact',
            label: (
                <Link to={'/contact'}>Contact</Link>
            ),
        });
        items.push({
            key: '/examples',
            label: 'Examples',
            children: [
                {
                    key: '/privacy-policy',
                    label: (
                        <NavLink to={'/privacy-policy'}>Privacy policy</NavLink>
                    ),
                },
                {
                    key: '/terms-of-use',
                    label: (
                        <NavLink to={'/terms-of-use'}>Terms of use</NavLink>
                    ),
                },
                {
                    key: '/examples/data-form-block',
                    label: (
                        <NavLink to={'/examples/data-form-block'}>Data Form block</NavLink>
                    ),
                },
                {
                    key: '/examples/data-form',
                    label: (
                        <NavLink to={'/examples/data-form'}>Data Form - admin panel page</NavLink>
                    ),
                },
                {
                    key: '/examples/page-builder-edit-page',
                    label: (
                        <NavLink to={'examples/page-builder-edit-page'}>Page builder edit page</NavLink>
                    ),
                },
            ],
        });
        return items;
    }, []);

    return (
        <Menu
            mode="horizontal"
            className="app-frontend-main-menu"
            activeKey={location.pathname}
            items={getMenuItems()}
        />
    );
}

export default MainMenuComponent;
