// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';

import { remarkAdmonitions } from './src/plugins/remark-admonitions.mjs';

export default defineConfig({
  site: 'https://penspulse326.github.io',

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
    },
  },
});
