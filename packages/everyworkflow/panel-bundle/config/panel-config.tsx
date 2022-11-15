
const PanelConfig = {
    PROJECT_NAME: import.meta.env.VITE_PROJECT_NAME,

    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    API_END_POINT: import.meta.env.VITE_API_END_POINT,

    MEDIA_BASE_URL: import.meta.env.VITE_MEDIA_BASE_URL,

    API_END_POINT_SWAP: import.meta.env.VITE_API_END_POINT_SWAP,

    REACT_AUTH_PREFIX_KEY: import.meta.env.VITE_REACT_AUTH_PREFIX_KEY,

    REACT_DEBUG: import.meta.env.VITE_REACT_DEBUG,
    REACT_REMOTE_DEBUG: import.meta.env.VITE_REACT_REMOTE_DEBUG,

    TINY_API_KEY: import.meta.env.VITE_TINY_API_KEY,
};

export default PanelConfig;
