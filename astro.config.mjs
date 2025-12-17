// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';

import { remarkAdmonitions } from './src/plugins/remark-admonitions.mjs';

export default defineConfig({
  site: 'https://penspulse326.github.io',

  output: 'static',

  image: {
    // 確保圖片優化正確處理高解析度螢幕
    domains: [],
    remotePatterns: [],
  },

  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions],
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
      // 提高 chunk 大小警告限制
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // 為靜態資源添加長期快取的檔名
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) {
              return `_astro/[name].[hash][extname]`;
            }
            if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
              return `_astro/fonts/[name].[hash][extname]`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
              return `_astro/images/[name].[hash][extname]`;
            }
            return `_astro/[name].[hash][extname]`;
          },
          // 手動分割 chunk 以優化載入
          manualChunks: (id) => {
            // 將 three.js 單獨打包
            if (id.includes('node_modules/three')) {
              return 'three';
            }
            // 將 Bootstrap 單獨打包
            if (id.includes('node_modules/bootstrap')) {
              return 'bootstrap';
            }
          },
        },
      },
    },
  },

  // 設定 build 輸出
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },

  // 實驗性功能優化
  experimental: {
    clientPrerender: true,
  },
});
