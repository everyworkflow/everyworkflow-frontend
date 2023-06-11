/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { createRef } from "react";
import { Carousel, Button, Image, theme } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import "./index.css";

const BannerSliderComponent = () => {
  const { token } = theme.useToken();
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
    <div className="card-container">
      <Carousel {...settings}>
        <div>
          <Image
            width="100%"
            src="/images/demo-image-5.png"
            alt="banner_image"
            preview={false}
          />
        </div>
        <div>
          <Image
            width="100%"
            src="/images/demo-image-1.png"
            alt="banner_image"
            preview={false}
          />
        </div>
        <div>
          <Image
            width="100%"
            src="/images/demo-image-2.png"
            alt="banner_image"
            preview={false}
          />
        </div>
      </Carousel>
      <div
        className="slider-button-container-left"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Button
          icon={<LeftOutlined className="silder-icon-left" />}
          className="silder-button-left"
          onClick={() => {
            sliderRef.current?.prev();
          }}
        />
      </div>
      <div
        className="slider-button-container-right"
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Button
          icon={<RightOutlined className="silder-icon-right" />}
          className="silder-button-right"
          onClick={() => {
            sliderRef.current?.next();
          }}
        />
      </div>
    </div>
  );
};

export default BannerSliderComponent;
