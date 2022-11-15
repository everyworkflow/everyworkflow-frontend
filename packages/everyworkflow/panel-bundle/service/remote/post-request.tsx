/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import ResponseResolver from '@everyworkflow/panel-bundle/service/remote/response-resolver';
import UrlHelper from "@everyworkflow/panel-bundle/helper/url-helper";
import BuildHeader from "@everyworkflow/panel-bundle/service/remote/build-header";
import RefreshAuthToken from '@everyworkflow/panel-bundle/service/remote/refresh-auth-token';
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const PostRequest = async (endPoint: string, data: any | Array<any>, options: any = {}): Promise<any> => {

    const url = UrlHelper.buildApiUrl(endPoint);
    const headers = await BuildHeader();
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        ...headers,
        ...options,
    };

    if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 0) {
        console.log('remote post -> ' + url, fetchOptions);
    }

    const res = await fetch(url, fetchOptions);

    if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 1) {
        console.log('remote post response -> ' + url, res);
    }

    if (res.status === 401) {
        await RefreshAuthToken();
        return PostRequest(endPoint, data, options);
    }

    return ResponseResolver(res, url);
};

export default PostRequest;
