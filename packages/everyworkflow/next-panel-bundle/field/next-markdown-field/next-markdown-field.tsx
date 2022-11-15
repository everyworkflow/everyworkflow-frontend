/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy, useState, useLayoutEffect } from 'react';

const MarkdownField = lazy(
    () => import('@everyworkflow/data-form-bundle/field/markdown-field')
);

const NextMarkdownField = (props: any) => {
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Markdown editor loading ...</div>;
    }

    return <div><MarkdownField {...props} /></div>;
}

export default NextMarkdownField;

