/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useState } from 'react';
import { Button, Space, Popover, Image } from 'antd';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import ProductSwatchInterface from '@everyworkflow/catalog-product-bundle/model/product-swatch-interface';
import SwatchImageInterface from "@everyworkflow/catalog-product-bundle/model/product-swatch/swatch-image-interface";
import SwatchHexInterface from "@everyworkflow/catalog-product-bundle/model/product-swatch/swatch-hex-interface";
import SwatchTextInterface from "@everyworkflow/catalog-product-bundle/model/product-swatch/swatch-text-interface";

interface ProductSwatchComponentProps {
    productSwatch?: ProductSwatchInterface;
    defaultValue?: any;
    onChange?: (value: any) => void;
}

const ProductSwatchComponent = ({ productSwatch, defaultValue, onChange }: ProductSwatchComponentProps) => {
    const [currentValue, setCurrentValue] = useState<any | undefined>(defaultValue)

    const handleChange = (value: any) => {
        setCurrentValue(value);
        if (onChange) {
            onChange(value);
        }
    }

    const renderSelectedMarker = () => {
        return (
            <CheckOutlined style={{
                position: 'absolute',
                zIndex: 1,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, 0)',
            }} />
        );
    }

    const renderHex = (item: SwatchHexInterface, index: number) => {
        return (
            <Popover
                key={index}
                content={(
                    <div>
                        <div style={{
                            backgroundColor: item.hex,
                            width: 64,
                            height: 64
                        }}></div>
                        <div style={{
                            textAlign: 'center'
                        }}>{item.label}</div>
                    </div>
                )}>
                <Button
                    icon={currentValue === item.key ? renderSelectedMarker() : undefined}
                    shape="circle"
                    style={{
                        backgroundColor: item.hex,
                        width: 32,
                        height: 32
                    }}
                    onClick={() => {
                        handleChange(item.key);
                    }}> </Button>
            </Popover>
        );
    }

    const renderText = (item: SwatchTextInterface, index: number) => {
        return (
            <Popover
                key={index}
                content={(
                    <div>
                        <div style={{
                            textAlign: 'center'
                        }}>{item.label}</div>
                    </div>
                )}>
                <Button
                    icon={currentValue === item.key ? renderSelectedMarker() : undefined}
                    shape="circle"
                    style={{
                        width: 32,
                        height: 32
                    }}
                    onClick={() => {
                        handleChange(item.key);
                    }}>{item.text}</Button>
            </Popover>
        );
    }

    const renderImage = (item: SwatchImageInterface, index: number) => {
        return (
            <Popover
                key={index}
                content={(
                    <div>
                        <Image
                            src={item.image_url}
                            alt={item.label}
                            preview={false}
                            style={{
                                width: 128,
                            }}
                        />
                        <div style={{
                            textAlign: 'center'
                        }}>{item.label}</div>
                    </div>
                )}>
                <Button
                    icon={currentValue === item.key ? renderSelectedMarker() : undefined}
                    style={{
                        height: 'auto',
                        width: 34,
                        padding: 0,
                    }}
                    onClick={() => {
                        handleChange(item.key);
                    }}>
                    <Image
                        src={item.small_image_url}
                        alt={item.label}
                        preview={false}
                        style={{
                            width: 32,
                        }}
                    />
                </Button>
            </Popover>
        );
    }

    return (
      <>
        <div style={{ marginTop: 20 }}>
          <div className="ant-form-item-label">
            <label>{productSwatch?.label}</label>
          </div>
          <div className="ant-form-item-control" style={{ marginTop: 5 }}>
            <Space>
              {productSwatch?.items?.map((item, index) => {
                switch (productSwatch.type) {
                  case "hex": {
                    return renderHex(item, index);
                  }
                  case "text": {
                    return renderText(item, index);
                  }
                  case "image": {
                    return renderImage(item, index);
                  }
                  default: {
                    return null;
                  }
                }
              })}
            </Space>
          </div>
        </div>
      </>
    );
}

export default ProductSwatchComponent;
