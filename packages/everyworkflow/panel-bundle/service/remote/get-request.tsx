/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ResponseResolver from "@everyworkflow/panel-bundle/service/remote/response-resolver";
import UrlHelper from "@everyworkflow/panel-bundle/helper/url-helper";
import BuildHeader from "@everyworkflow/panel-bundle/service/remote/build-header";
import RefreshAuthToken from "@everyworkflow/panel-bundle/service/remote/refresh-auth-token";
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const GetRequest = async (endPoint: string, options: any = {}): Promise<any> => {
    const url = UrlHelper.buildApiUrl(endPoint);
    const headers = await BuildHeader();
    const fetchOptions = {
        method: 'get',
        ...headers,
        ...options
    };

    if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 0) {
        console.log('remote get -> ' + url);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 1) {
        console.log('remote get response -> ' + url, res);
    }

    if (res.status === 401) {
        await RefreshAuthToken();
        return GetRequest(endPoint, options);
    }

    return ResponseResolver(res, url);
};

export default GetRequest;
