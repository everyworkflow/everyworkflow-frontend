/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import MediaGridItem from '@everyworkflow/media-manager-bundle/component/media-grid-item';
import MediaItemInterface from '@everyworkflow/media-manager-bundle/model/media-item-interface';
import MediaManagerContext from '@everyworkflow/media-manager-bundle/context/media-manager-context';
import { ACTION_NEXT_PAGE } from '@everyworkflow/media-manager-bundle/reducer/media-manager-reducer';
import LoadingIndicatorComponent from "@everyworkflow/panel-bundle/component/loading-indicator-component";

const MediaGrid = () => {
    const { state: mediaState, dispatch: mediaDispatch } = useContext(MediaManagerContext);

    return (
        <>
            <Row gutter={16}>
                {mediaState.media_manager_data.map(
                    (item: MediaItemInterface, index: number) => (
                        <MediaGridItem key={index} itemData={item} />
                    )
                )}
                {!mediaState.is_next_page_ended && (
                    <Col span="24" style={{ padding: 24, textAlign: 'center' }}>
                        <Button
                            type="dashed"
                            disabled={mediaState.loading}
                            onClick={() => {
                                mediaDispatch({ type: ACTION_NEXT_PAGE });
                            }}>
                            {mediaState.loading ? <LoadingIndicatorComponent /> : 'Load more'}
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default MediaGrid;
