import {fileURLToPath, URL } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'
import vitePluginShiki from './plugins/vite-plugin-shiki.js'

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  define: {
    __DEV__: true,
  },
  resolve: {
    alias: {
      'axii-ui-theme-common': fileURLToPath(new URL('../theme-common/src/index.ts', import.meta.url)),
      'axii-ui-theme-inc': fileURLToPath(new URL('../theme-inc/src', import.meta.url)),
      'axii-ui-theme-fallout': fileURLToPath(new URL('../theme-fallout/src', import.meta.url)),
      'axii-ui': fileURLToPath(new URL('../components/src/index.ts', import.meta.url)),
      'axii': fileURLToPath(new URL('../../../axii/src/index.ts', import.meta.url)),
      'data0': fileURLToPath(new URL('../../../data0/src/index.ts', import.meta.url)),
      'axii-designer': fileURLToPath(new URL('../designer/src', import.meta.url)),
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    tsconfigPaths(),
    vitePluginShiki({
      theme: 'material-theme-ocean' // 你可以更换其他主题
    })
  ],
}
