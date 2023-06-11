import React from 'react';
import fs from "fs";
import { ConfigProvider } from "antd";
import { extractStyle } from "@ant-design/static-style-extract";

const outputPath = "./public/antd.min.css";

const css = extractStyle((node: JSX.Element) => (
    <ConfigProvider theme={{
        token: {
            colorPrimary: "#52c41a",
            colorBgContainer: "#f1f3f6",
        }
    }}>
        {node}
    </ConfigProvider>
));

fs.writeFileSync(outputPath, css);

console.log(`🎉 Antd CSS generated at ${outputPath}`);
