/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import Select from 'antd/lib/select';

interface ProductSelectComponentProps {
    label?: string;
    defaultValue?: any;
    options?: Array<any>;
    onChange?: (value: any) => void;
}

const ProductSelectComponent = ({ label, defaultValue, options, onChange }: ProductSelectComponentProps) => {
    return (
        <div className="ant-form-item">
            <div className="ant-form-item-label">
                <label>{label}</label>
            </div>
            <div className="ant-form-item-control">
                <Select
                    defaultValue={defaultValue}
                    style={{ width: 120 }}
                    onChange={onChange}
                    options={options} />
            </div>
        </div>
    );
}

export default ProductSelectComponent;
