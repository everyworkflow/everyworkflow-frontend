/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useEffect, useState } from "react";
import { useTitle } from "ahooks";
import { useLocation } from "react-router-dom";
import Error404Component from "@everyworkflow/panel-bundle/component/error-404-component";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import PageBuilderComponent from "@everyworkflow/page-builder-bundle/component/page-builder-component";
import LoadingIndicatorComponent from "@everyworkflow/panel-bundle/component/loading-indicator-component";

const FinalPage = () => {
    const [data, setData] = useState<any>(undefined);
    const location = useLocation();

    useEffect(() => {
        const run = async () => {
            let pathName = location.pathname;
            if (pathName === '/') {
                pathName = '/home';
            }
            try {
                const response = await Remote.get(`/url-rewrite${pathName}`);
                setData(response);
            } catch (error: any) {
                console.log('error -->', error.message);
                setData(false);
            }
        }
        run();
    }, [location.pathname]);

    const RenderPageContent = () => {
        if (data.meta_title) {
            useTitle(data.meta_title.toString());
        }
        return (
            <>
                {(data && !!data.item && !!data.item.page_builder_data) ? (
                    <PageBuilderComponent pageBuilderData={data.item.page_builder_data} />
                ) : <Error404Component />}
            </>
        );
    }

    return (
        <>
            {(data !== undefined) ? (
                <RenderPageContent />
            ) : <LoadingIndicatorComponent />}
        </>
    );
}

export default FinalPage;
