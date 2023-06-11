/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Select } from 'antd';

interface ProductSelectComponentProps {
    label?: string;
    defaultValue?: any;
    options?: Array<any>;
    onChange?: (value: any) => void;
}

const ProductSelectComponent = ({ label, defaultValue, options, onChange }: ProductSelectComponentProps) => {
    return (
      <div style={{ marginTop: 20 }}>
        <div>
          <label>{label}</label>
        </div>
        <div style={{ marginTop: 5 }}>
          <Select
            defaultValue={defaultValue}
            style={{ width: 120 }}
            onChange={onChange}
            options={options}
          />
        </div>
      </div>
    );
}

export default ProductSelectComponent;
