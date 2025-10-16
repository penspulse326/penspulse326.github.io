// @ts-check
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';

import { remarkAdmonitions } from './src/plugins/remark-admonitions.mjs';

export default defineConfig({
  site: 'https://penspulse326.github.io',

  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions],
  },
});
