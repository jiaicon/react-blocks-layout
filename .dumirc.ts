import { defineConfig } from 'dumi';
const path = require('path');

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    logo: '/imgs/logo.png',
    footer: 'Powered by React Blocks Layout',
    name: 'react-blocks-layout',
  },
  favicons: ['/imgs/logo.png'],
  styles: [
    '.dumi-default-header-left { width: auto !important; min-width: 184px; padding-right: 50px; } .dumi-default-hero-title { font-size: 100px !important; }',
  ],
});
