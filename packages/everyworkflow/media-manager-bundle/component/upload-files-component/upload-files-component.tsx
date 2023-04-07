/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Upload, message } from 'antd';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import UrlHelper from '@everyworkflow/panel-bundle/helper/url-helper';
import MediaManagerContext from '@everyworkflow/media-manager-bundle/context/media-manager-context';
import LocalStorage from '@everyworkflow/panel-bundle/service/local-storage';
import PanelConfig from '@everyworkflow/panel-bundle/config/panel-config';

const UploadFilesComponent = () => {
    const { state: mediaState } = useContext(MediaManagerContext);
    const authPrefixKey: string = PanelConfig.REACT_AUTH_PREFIX_KEY ?? 'ew_';

    const getProps = () => {
        const requestHeader: any = {
            'accept': 'application/json',
        };
        try {
            const authData: any = LocalStorage.get(authPrefixKey + 'auth');
            if (authData.token) {
                requestHeader['Authorization'] = 'Bearer ' + authData.token;
            }
        } catch (error: any) { }

        let props: any = {
            name: 'file',
            multiple: true,
            action: UrlHelper.buildApiUrl('/media-manager/upload?path=' + mediaState.remote_media_path),
            headers: requestHeader,
            onChange: (info: any) => {
                const { status } = info.file;
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return props;
    }

    return (
        <>
            <Upload.Dragger {...getProps()}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
        </>
    );
};

export default UploadFilesComponent;
