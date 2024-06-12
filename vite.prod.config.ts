import {resolve} from "path";
import dts from 'vite-plugin-dts'

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    target: 'esnext',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['axii']
    },
  },
  plugins: [dts({
    tsconfigPath: resolve(__dirname, 'tsconfig.prod.json'),
    rollupTypes: true,
    include: ['src/*.ts', 'src/*.tsx'],
    // bundledPackages: ['data0']
  })]
}
