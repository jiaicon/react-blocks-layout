import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-blocks-layout',
  },
  styles: ['.dumi-default-header-left { width: auto !important; min-width: 184px; padding-right: 50px; }']
});
