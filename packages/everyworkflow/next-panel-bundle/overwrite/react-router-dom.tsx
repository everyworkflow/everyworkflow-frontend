/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { default as NextLink } from "next/link";

export const Link = (props: any) => {
    return <NextLink href={props.to} {...props}>{props.children}</NextLink>;
};

