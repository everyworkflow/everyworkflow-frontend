/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { lazy } from 'react';
import { DataFormFieldMaps as OldDataFormFieldMaps } from './../../data-form-bundle/root/data-form-field-maps';

const MarkdownField = lazy(
    () => import('@everyworkflow/next-panel-bundle/field/next-markdown-field')
);

export const DataFormFieldMaps: any = {
    ...OldDataFormFieldMaps,
    markdown_field: MarkdownField,
};
