/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createRef } from 'react';
import Carousel, { CarouselRef } from 'antd/lib/carousel';
import Image from 'antd/lib/image';
import Button from 'antd/lib/button';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';


const BannerSliderComponent = () => {
    const sliderRef = createRef<CarouselRef>();

    const settings = {
        ref: sliderRef,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="app-homepage-banner-slider">
            <Carousel {...settings}>
                <div>
                    <Image
                        src="/media/test-images/cropped-gervyn-louis-ZVZxYaSrvAI-unsplash.jpg"
                        alt="first"
                        width={'100%'}
                        preview={false} />
                </div>
                <div>
                    <Image
                        src="/media/test-images/cropped-hannah-morgan-ycVFts5Ma4s-unsplash.jpg"
                        alt="first"
                        width={'100%'}
                        preview={false} />
                </div>
                <div>
                    <Image
                        src="/media/test-images/cropped-freestocks-_3Q3tsJ01nc-unsplash.jpg"
                        alt="first"
                        width={'100%'}
                        preview={false} />
                </div>
            </Carousel>
            <div className="slider-actions">
                <Button
                    icon={<LeftOutlined />}
                    shape="circle"
                    type="primary"
                    onClick={() => {
                        sliderRef.current?.prev();
                    }}
                />
                <Button
                    icon={<RightOutlined />}
                    shape="circle"
                    type="primary"
                    onClick={() => {
                        sliderRef.current?.next();
                    }}
                />
            </div>
        </div>
    );
}

export default BannerSliderComponent;
