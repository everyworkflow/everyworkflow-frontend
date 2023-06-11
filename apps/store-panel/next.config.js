/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        "antd",
        "@everyworkflow/panel-bundle",
        "@everyworkflow/data-form-bundle",
        "@everyworkflow/media-manager-bundle",
        "@everyworkflow/page-builder-bundle",
        "@everyworkflow/catalog-product-bundle",
        "@everyworkflow/next-panel-bundle",
        "@everyworkflow/front-panel-bundle",
        "@everyworkflow/store-panel-bundle",

    ],
    reactStrictMode: true
};

module.exports = nextConfig;
