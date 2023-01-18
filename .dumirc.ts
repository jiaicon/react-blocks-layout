import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-blocks-layout',
  },
  base: '/react-blocks-layout',
  publicPath: '/docs-dist/',
  styles: ['.dumi-default-header-left { width: auto !important; min-width: 184px; padding-right: 50px; }']
});
