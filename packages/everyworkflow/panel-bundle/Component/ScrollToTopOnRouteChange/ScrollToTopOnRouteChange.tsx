/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopOnRouteChangeProps {
    children: JSX.Element | JSX.Element[];
}

const ScrollToTopOnRouteChange = ({ children }: ScrollToTopOnRouteChangeProps) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            {children}
        </>
    );
};

export default ScrollToTopOnRouteChange;
