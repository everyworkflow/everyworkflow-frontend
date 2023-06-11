import React from "react";
import { Typography } from "antd";

const { Title } = Typography;
const EmptyMessageComponent = ({
  message = "No data found.",
}: {
  message?: string;
}) => {
  return <Title level={5}>{message}</Title>;
};

export default EmptyMessageComponent;
