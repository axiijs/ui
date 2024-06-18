import {resolve} from 'node:path'
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    target: 'esnext',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        index: 'src/index.tsx',
        common: 'src/common.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['axii', 'axii-ui', 'axii-ui-theme-common']
    },
  },
  plugins: [dts({
    tsconfigPath: resolve(__dirname, 'tsconfig.prod.json'),
    rollupTypes: true,
    include: ['src'],
  })]
}
