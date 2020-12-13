import { defineConfig } from 'umi';
import themeConfig from './config/theme.config.ts';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    mock: false,
    dva: {
        immer: true,
        hmr: false,
    },
    theme: themeConfig,
    antd: {
        dark: false, // 开启暗色主题
        compact: true,
    },
    // layout: {
    //     name: 'chengmac master',
    //     locale: false,
    //     theme: 'pro',
    // },
    targets: {
        ie: 11,
    },
    outputPath: './chengmac-master',
    define: {
        API_DOMAIN: 'http://localhost:5000',
        // API_DOMAIN: 'https://api.chengmac.cn',
        APP_ACCESS_KEY: 'd3ZpMthP2yXgmY-dIcDZv9vluRFhDR1OnTnfp8NHXwo',
    },
});
