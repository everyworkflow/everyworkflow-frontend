# EveryWorkflow Platform Frontend

Turbo repo for EveryWorkflow Platform Frontend


## Quick startup

API server must be running.

Then,

- Clone repo
- yarn install
- yarn dev


## Build styles for admin panel

https://www.npmjs.com/package/@emeks/antd-custom-theme-generator

```

npx @emeks/antd-custom-theme-generator --antd=./../../node_modules/antd ./src/Theme.less ./public/dist/css/theme.css --watch

npx @emeks/antd-custom-theme-generator --antd=./../../node_modules/antd --theme=dark ./src/Theme.less ./public/dist/css/dark-theme.css --watch

```
