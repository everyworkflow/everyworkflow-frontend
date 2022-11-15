var path = require("path");

const withTM = require("next-transpile-modules")([
    "ui",
    "@everyworkflow/panel-bundle",
    "@everyworkflow/data-form-bundle",
    "@everyworkflow/media-manager-bundle",
    "@everyworkflow/page-builder-bundle",
    "@everyworkflow/catalog-product-bundle",
    "@everyworkflow/next-panel-bundle",
    "@everyworkflow/front-panel-bundle",
    "@everyworkflow/store-panel-bundle",
]);

module.exports = withTM({
    reactStrictMode: true
});
