/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Image } from 'antd';
import TextFieldInterface from '@everyworkflow/data-form-bundle/model/field/text-field-interface';
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';

interface MediaImageGallerySelectorFieldColumnProps {
    fieldData?: TextFieldInterface;
    fieldValue?: any;
    rowData?: any;
}

const MediaImageGallerySelectorFieldColumn = ({ fieldData, fieldValue }: MediaImageGallerySelectorFieldColumnProps) => {
    if (fieldValue !== undefined && Array.isArray(fieldValue) && fieldValue.length > 0) {
        return (
            <Image
                src={UrlHelper.buildImgUrlFromPath(fieldValue[0]?.path_name)}
            />
        );
    }
    return <span>Invalid</span>;
}

export default MediaImageGallerySelectorFieldColumn;
