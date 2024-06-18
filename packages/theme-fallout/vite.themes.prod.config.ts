import {resolve} from "path";
import dts from 'vite-plugin-dts'
import Macros from 'unplugin-macros/vite'

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  resolve: {
    alias: {
      'axii-ui': resolve(__dirname, './src/index.ts'),
    }
  },
  build: {
    target: 'esnext',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        'inc': 'src/themes/inc/index.ts'
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: 'dist/themes',
      },
      external: ['axii', 'axii-ui']
    },
  },
  plugins: [dts({
    tsconfigPath: resolve(__dirname, 'tsconfig.themes.prod.json'),
    entryRoot: 'src/themes',
    strictOutput: true,
    outDir: 'dist/themes',
    // rollupTypes: true,
    include: ['src/themes/*.ts', 'src/themes/*.tsx', 'src/themes/**/*.ts', ],
    // bundledPackages: ['data0']
  }), Macros()]
}
