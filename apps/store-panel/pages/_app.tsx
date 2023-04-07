/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import type { AppProps } from 'next/app';
import HeaderComponent from "@everyworkflow/store-panel-bundle/component/header-component";
import FooterComponent from "@everyworkflow/store-panel-bundle/component/footer-component";
import RootPanelComponent from '@everyworkflow/panel-bundle/component/root-panel-component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/reset.css';

library.add(fas);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RootPanelComponent>
            <HeaderComponent />
            <Component {...pageProps} />
            <FooterComponent />
        </RootPanelComponent>
    );
}

export default MyApp;
