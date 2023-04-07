/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { Button, Space } from "antd";
import Link from "next/link";

const FooterBottomComponent = () => {
    return (
        <div className="app-footer-bottom">
            <div>Copyright 2022 EveryWorkflow. All rights reserved.</div>
            <div>
                <Space>
                    <Link href="/terms-conditions">
                        <Button type="link">Terms & conditions</Button>
                    </Link>
                    <Link href="/privacy-cookies">
                        <Button type="link">Privacy & cookies</Button>
                    </Link>
                </Space>
            </div>
        </div>
    );
};

export default FooterBottomComponent;
