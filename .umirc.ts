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
  // theme: themeConfig,
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
  define: {
    API_DOMAIN: 'http://localhost:5000',
  },
});
