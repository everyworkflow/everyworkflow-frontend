/*
 * @copyright EveryWorkflow. All rights reserved.
 */
import { theme } from 'antd';

const LightThemePreview = () => {
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
                    d="M25.128 20h109.744c1.783 0 2.43.186 3.082.534.652.349 1.163.86 1.512 1.512.348.652.534 1.299.534 3.082v69.744c0 1.783-.186 2.43-.534 3.082a3.635 3.635 0 01-1.512 1.512c-.652.348-1.299.534-3.082.534H25.128c-1.783 0-2.43-.186-3.082-.534a3.635 3.635 0 01-1.512-1.512c-.348-.652-.534-1.299-.534-3.082V25.128c0-1.783.186-2.43.534-3.082a3.635 3.635 0 011.512-1.512c.652-.348 1.299-.534 3.082-.534z"
                ></path>
                <filter
                    id="filter-4"
                    width="115%"
                    height="122.5%"
                    x="-7.5%"
                    y="-10%"
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
                        stdDeviation="2"
                    ></feGaussianBlur>
                    <feColorMatrix
                        in="shadowBlurOuter1"
                        result="shadowMatrixOuter1"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                    ></feColorMatrix>
                    <feMorphology
                        in="SourceAlpha"
                        radius="0.5"
                        result="shadowSpreadOuter2"
                    ></feMorphology>
                    <feOffset
                        dy="1"
                        in="shadowSpreadOuter2"
                        result="shadowOffsetOuter2"
                    ></feOffset>
                    <feGaussianBlur
                        in="shadowOffsetOuter2"
                        result="shadowBlurOuter2"
                        stdDeviation="3"
                    ></feGaussianBlur>
                    <feColorMatrix
                        in="shadowBlurOuter2"
                        result="shadowMatrixOuter2"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                    ></feColorMatrix>
                    <feOffset
                        dy="1"
                        in="SourceAlpha"
                        result="shadowOffsetOuter3"
                    ></feOffset>
                    <feGaussianBlur
                        in="shadowOffsetOuter3"
                        result="shadowBlurOuter3"
                        stdDeviation="1"
                    ></feGaussianBlur>
                    <feColorMatrix
                        in="shadowBlurOuter3"
                        result="shadowMatrixOuter3"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
                    ></feColorMatrix>
                    <feMerge>
                        <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                        <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                        <feMergeNode in="shadowMatrixOuter3"></feMergeNode>
                    </feMerge>
                </filter>
                <path
                    id="path-5"
                    d="M61.128 40h109.744c1.783 0 2.43.186 3.082.534.652.349 1.163.86 1.512 1.512.348.652.534 1.299.534 3.082v69.744c0 1.783-.186 2.43-.534 3.082a3.635 3.635 0 01-1.512 1.512c-.652.348-1.299.534-3.082.534H61.128c-1.783 0-2.43-.186-3.082-.534a3.635 3.635 0 01-1.512-1.512c-.348-.652-.534-1.299-.534-3.082V45.128c0-1.783.186-2.43.534-3.082a3.635 3.635 0 011.512-1.512c.652-.348 1.299-.534 3.082-.534z"
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
                <g transform="translate(-578 -1542)">
                    <g transform="translate(506 1542)">
                        <g transform="translate(72)">
                            <mask id="mask-2" fill="#fff">
                                <use xlinkHref="#path-1"></use>
                            </mask>
                            <use fill="#EDF1F7" xlinkHref="#path-1"></use>
                            <g mask="url(#mask-2)">
                                <use
                                    fill="#000"
                                    filter="url(#filter-4)"
                                    xlinkHref="#path-3"
                                ></use>
                                <use fill="#F1F5FA" xlinkHref="#path-3"></use>
                            </g>
                            <g mask="url(#mask-2)">
                                <use
                                    fill="#000"
                                    filter="url(#filter-6)"
                                    xlinkHref="#path-5"
                                ></use>
                                <use fill="#FFF" xlinkHref="#path-5"></use>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default LightThemePreview;

