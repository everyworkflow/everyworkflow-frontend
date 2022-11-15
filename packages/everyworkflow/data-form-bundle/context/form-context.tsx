/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createContext } from 'react';
import FormStateInterface from '@everyworkflow/data-form-bundle/model/form-state-interface';
import { formState } from "@everyworkflow/data-form-bundle/state/form-state";

export const PANEL_ACTIVE_FILTERS = 'panel_filters';
export const PANEL_ACTIVE_COLUMN_SETTINGS = 'column_settings';

export interface FormContextInterface {
    state: FormStateInterface;
    dispatch: any;
}

const FormContext = createContext<FormContextInterface>({
    state: formState,
    dispatch: () => null,
});

export default FormContext;
