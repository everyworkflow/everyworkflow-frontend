/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { theme } from 'antd';

const DarkThemePreview = () => {
    const { token } = theme.useToken();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="120"
            height="80"
            viewBox="0 0 120 80"
            style={{ display: 'block', borderRadius: token.borderRadius }}
        >
            <defs>
                <path id="path-1" d="M0 0L120 0 120 80 0 80z"></path>
                <path
                    id="path-3"
                    d="M22.564 20h114.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v74.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267H22.563c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756c-.174-.326-.267-.65-.267-1.54V22.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"
                ></path>
                <filter
                    id="filter-4"
                    width="126.7%"
                    height="140%"
                    x="-13.3%"
                    y="-17.5%"
                    filterUnits="objectBoundingBox"
                >
                    <feOffset
                        dy="2"
                        in="SourceAlpha"
                        result="shadowOffsetOuter1"
                    ></feOffset>
                    <feGaussianBlur
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                        stdDeviation="5"
                    ></feGaussianBlur>
                    <feColorMatrix
                        in="shadowBlurOuter1"
                        values="0 0 0 0 0.0898254103 0 0 0 0 0.115558755 0 0 0 0 0.227270154 0 0 0 0.210473121 0"
                    ></feColorMatrix>
                </filter>
                <path
                    id="path-5"
                    d="M58.564 40h114.872c.892 0 1.215.093 1.54.267.327.174.583.43.757.756.174.326.267.65.267 1.54v74.873c0 .892-.093 1.215-.267 1.54-.174.327-.43.583-.756.757-.326.174-.65.267-1.54.267H58.563c-.892 0-1.215-.093-1.54-.267a1.817 1.817 0 01-.757-.756c-.174-.326-.267-.65-.267-1.54V42.563c0-.892.093-1.215.267-1.54.174-.327.43-.583.756-.757.326-.174.65-.267 1.54-.267z"
                ></path>
                <filter
                    id="filter-6"
                    width="108.3%"
                    height="112.5%"
                    x="-4.2%"
                    y="-5%"
                    filterUnits="objectBoundingBox"
                >
                    <feOffset
                        dy="1"
                        in="SourceAlpha"
                        result="shadowOffsetOuter1"
                    ></feOffset>
                    <feGaussianBlur
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                        stdDeviation="1.5"
                    ></feGaussianBlur>
                    <feColorMatrix
                        in="shadowBlurOuter1"
                        values="0 0 0 0 0.0898254103 0 0 0 0 0.115558755 0 0 0 0 0.227270154 0 0 0 0.210473121 0"
                    ></feColorMatrix>
                </filter>
            </defs>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g transform="translate(-726 -1542)">
                    <g transform="translate(506 1542)">
                        <g transform="translate(220)">
                            <mask id="mask-2" fill="#fff">
                                <use xlinkHref="#path-1"></use>
                            </mask>
                            <use fill="#4F5155" xlinkHref="#path-1"></use>
                            <g mask="url(#mask-2)">
                                <use
                                    fill="#000"
                                    filter="url(#filter-4)"
                                    xlinkHref="#path-3"
                                ></use>
                                <use fill="#292929" xlinkHref="#path-3"></use>
                            </g>
                            <g mask="url(#mask-2)">
                                <use
                                    fill="#000"
                                    filter="url(#filter-6)"
                                    xlinkHref="#path-5"
                                ></use>
                                <use fill="#4F5155" xlinkHref="#path-5"></use>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default DarkThemePreview;

