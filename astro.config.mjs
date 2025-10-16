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
      rollupOptions: {
        output: {
          // 為靜態資源添加長期快取的檔名
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
              return `_astro/fonts/[name].[hash][extname]`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
              return `_astro/images/[name].[hash][extname]`;
            }
            return `_astro/[name].[hash][extname]`;
          },
        },
      },
    },
  },

  // 設定 build 輸出的 headers
  build: {
    inlineStylesheets: 'auto',
  },
});
