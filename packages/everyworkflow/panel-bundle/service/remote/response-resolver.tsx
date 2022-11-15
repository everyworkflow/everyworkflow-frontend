/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import HttpError from "@everyworkflow/panel-bundle/error/http-error";
import ValidationError from '@everyworkflow/panel-bundle/error/validation-error';
import PanelConfig from "@everyworkflow/panel-bundle/config/panel-config";

const ResponseResolver = async (res: any, url: string): Promise<any> => {
    const statusCode = res.status;
    let response: any = {};

    try {
        response = await res.json();
        if (Number(PanelConfig.REACT_DEBUG) && Number(PanelConfig.REACT_REMOTE_DEBUG) > 2) {
            console.log('remote response data -> ' + url + ' - ' + statusCode, response);
        }
    } catch (error: any) {
        throw new HttpError('Remote could not resolve!');
    }

    switch (statusCode) {
        case 200: {
            return response;
        }
        case 400: {
            throw new ValidationError(response?.detail, statusCode, response?.errors);
        }
        default: {
            throw new HttpError(response?.detail, statusCode);
        }
    }
};

export default ResponseResolver;
