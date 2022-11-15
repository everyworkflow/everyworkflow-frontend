/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const UrlHelper = {
    buildUrl: (url: string): string => {
        if (!url.startsWith('https://') && !url.startsWith('http://') &&
            PanelConfig.API_BASE_URL && !url.startsWith(PanelConfig.API_BASE_URL)) {
            url = PanelConfig.API_BASE_URL + url;
        }
        return url;
    },

    buildApiUrl: (url: string): string => {
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            if (PanelConfig.API_END_POINT_SWAP) {
                try {
                    const swapData: any = JSON.parse(PanelConfig.API_END_POINT_SWAP);
                    Object.keys(swapData).forEach((swapKey: string) => {
                        if (url.startsWith(swapKey)) {
                            url = url.replace(swapKey, swapData[swapKey]);
                        }
                    });
                } catch (error: any) {
                    // do nothing
                }
            }
            if (PanelConfig.API_END_POINT && !url.startsWith(PanelConfig.API_END_POINT)) {
                url = PanelConfig.API_END_POINT + url;
            }
        }
        return UrlHelper.buildUrl(url);
    },

    buildImgUrlFromPath: (path: string | null | undefined): string => {
        if (path === null || path === undefined) {
            return '';
        }
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return PanelConfig.MEDIA_BASE_URL + path;
    },
};

export default UrlHelper;
