/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const UrlHelper = {
    buildUrl: (url: string): string => {
        if (!url.startsWith('https://') && !url.startsWith('http://') &&
            import.meta.env.VITE_API_BASE_URL && !url.startsWith(import.meta.env.VITE_API_BASE_URL)) {
            url = import.meta.env.VITE_API_BASE_URL + url;
        }
        return url;
    },

    buildApiUrl: (url: string): string => {
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            if (import.meta.env.VITE_API_END_POINT_SWAP) {
                try {
                    const swapData: any = JSON.parse(import.meta.env.VITE_API_END_POINT_SWAP);
                    Object.keys(swapData).forEach((swapKey: string) => {
                        if (url.startsWith(swapKey)) {
                            url = url.replace(swapKey, swapData[swapKey]);
                        }
                    });
                } catch (error: any) {
                    // do nothing
                }
            }
            if (import.meta.env.VITE_API_END_POINT && !url.startsWith(import.meta.env.VITE_API_END_POINT)) {
                url = import.meta.env.VITE_API_END_POINT + url;
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
        return import.meta.env.VITE_MEDIA_BASE_URL + path;
    },
};

export default UrlHelper;
