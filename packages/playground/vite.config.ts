import {fileURLToPath, URL } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'
import Macros from 'unplugin-macros/vite'

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
      'axii-ui/themes': fileURLToPath(new URL('../src/themes', import.meta.url)),
      'axii-ui': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      'axii': fileURLToPath(new URL('../../axii/src/index.ts', import.meta.url)),
      'data0': fileURLToPath(new URL('../../data0/src/index.ts', import.meta.url))
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [tsconfigPaths(), Macros()],

}
