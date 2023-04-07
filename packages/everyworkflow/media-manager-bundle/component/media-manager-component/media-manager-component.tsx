/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useEffect, useReducer, useRef } from 'react';
import { Row, Col, Image } from 'antd';
import { useSize } from 'ahooks';
import SidebarComponent from '@everyworkflow/media-manager-bundle/component/sidebar-component';
import MediaGrid from '@everyworkflow/media-manager-bundle/component/media-grid';
import MediaManagerContext from '@everyworkflow/media-manager-bundle/context/media-manager-context';
import MediaManagerReducer, {
    ACTION_HIDE_UPLOAD_FILES,
    ACTION_SELECTED_MEDIA_FOR_CONFIG,
    ACTION_SET_PREVIEW_IMAGE,
} from '@everyworkflow/media-manager-bundle/reducer/media-manager-reducer';
import FetchMediaAction from '@everyworkflow/media-manager-bundle/action/fetch-media-action';
import SidePanelComponent from '@everyworkflow/panel-bundle/component/side-panel-component';
import { PANEL_SIZE_MEDIUM } from '@everyworkflow/panel-bundle/component/side-panel-component/side-panel-component';
import MediaConfigPanel from '@everyworkflow/media-manager-bundle/component/media-config-panel';
import UploadFilesComponent from '@everyworkflow/media-manager-bundle/component/upload-files-component';
import SelectedMediaItemInterface from '@everyworkflow/media-manager-bundle/model/selected-media-item-interface';
import { mediaManagerState } from "@everyworkflow/media-manager-bundle/state/media-manager-state";

export const MEDIA_MANAGER_TYPE_NONE = 'media_manager_type_none'; // default
export const MEDIA_MANAGER_TYPE_MULTI_SELECT = 'media_manager_type_multi_select';
export const MEDIA_MANAGER_TYPE_SINGLE_SELECT = 'media_manager_type_single_select';

interface MediaManagerComponentProps {
    mediaManagerId?: string;
    initType?: string;
    mediaPath?: string;
    onClose?: () => void;
    selectedMediaData?: Array<SelectedMediaItemInterface>;
    onSelectedDataChange?: (items: any) => void;
}

const MediaManagerComponent = ({
    mediaManagerId,
    initType = MEDIA_MANAGER_TYPE_NONE,
    mediaPath = '/media',
    onClose,
    selectedMediaData = [],
    onSelectedDataChange,
}: MediaManagerComponentProps) => {
    const [state, dispatch] = useReducer(MediaManagerReducer, {
        ...mediaManagerState,
        media_manager_id: mediaManagerId,
        init_type: initType,
        remote_media_path: mediaPath,
        selected_media_data: selectedMediaData,
    });
    const mmRef = useRef<HTMLDivElement>(null);
    const mmSize = useSize(mmRef);

    useEffect(() => {
        const run = async () => {
            await FetchMediaAction('/media-manager', {
                path: state.remote_media_path,
                page: state.page_number,
            })(dispatch);
        };
        run();
    }, [state.remote_media_path, state.page_number]);

    const onSelectedButtonClick = () => {
        if (onSelectedDataChange) {
            onSelectedDataChange(state.selected_media_data);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <MediaManagerContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div ref={mmRef}>
                {mmSize?.width && mmSize?.width < 768 ? (
                    <>
                        <div style={{ marginBottom: 16 }}>
                            <SidebarComponent onSelectedButtonClick={onSelectedButtonClick} />
                        </div>
                        <MediaGrid />
                    </>
                ) : (
                    <Row gutter={16}>
                        <Col style={{ width: 250 }}>
                            <SidebarComponent onSelectedButtonClick={onSelectedButtonClick} />
                        </Col>
                        <Col flex="auto" style={{ width: 'calc(100% - 266px)' }}>
                            <MediaGrid />
                        </Col>
                    </Row>
                )}
                {state.preview_image && (
                    <Image
                        width={0}
                        height={0}
                        style={{ display: 'none' }}
                        src={state.preview_image.src}
                        preview={{
                            src: state.preview_image.src,
                            visible: state.preview_image.visible,
                            title: state.preview_image.title,
                            wrapStyle: { zIndex: 1210 },
                            maskStyle: { zIndex: 1205 },
                            onVisibleChange: (value) => {
                                dispatch({ type: ACTION_SET_PREVIEW_IMAGE, payload: value });
                            },
                        }}
                        alt={state.preview_image.title}
                    />
                )}
                {state.is_upload_files_visible && (
                    <SidePanelComponent
                        title={'Upload files'}
                        size={PANEL_SIZE_MEDIUM}
                        onClose={() => {
                            dispatch({ type: ACTION_HIDE_UPLOAD_FILES });
                        }}>
                        <UploadFilesComponent />
                    </SidePanelComponent>
                )}
                {state.selected_media_for_config && (
                    <SidePanelComponent
                        title={state.selected_media_for_config?.file_name + ' properties'}
                        size={PANEL_SIZE_MEDIUM}
                        onClose={() => {
                            dispatch({
                                type: ACTION_SELECTED_MEDIA_FOR_CONFIG,
                                payload: undefined,
                            });
                        }}>
                        <MediaConfigPanel />
                    </SidePanelComponent>
                )}
            </div>
        </MediaManagerContext.Provider>
    );
};

export default MediaManagerComponent;
