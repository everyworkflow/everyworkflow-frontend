/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import React, { useEffect, useState } from "react";
import Error404Component from "@everyworkflow/panel-bundle/Component/Error404Component";
import Remote from "@everyworkflow/panel-bundle/Service/Remote";
import { useLocation } from "react-router-dom";
import PageBuilderComponent from "@everyworkflow/page-builder-bundle/Component/PageBuilderComponent";
import { useTitle } from "ahooks";
import LoadingIndicatorComponent from "@everyworkflow/panel-bundle/Component/LoadingIndicatorComponent";

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
                {(data && !!data.page_builder_data) ? (
                    <PageBuilderComponent pageBuilderData={data.page_builder_data} />
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
