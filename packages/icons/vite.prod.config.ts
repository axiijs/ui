import {resolve} from "path";
import dts from 'vite-plugin-dts'

import icons from './icons.json'

const iconNames = icons.map(icon => {
  // 连字符转驼峰
    const name = icon.name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  // 首字母大写
    return name.charAt(0).toUpperCase() + name.slice(1)
})

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    target: 'esnext',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: Object.fromEntries(iconNames.map(name => [name, `src/icons/${name}.tsx`])),
      formats: ['es'],
    },
    rollupOptions: {

    },
  },
  plugins: [dts({
    tsconfigPath: resolve(__dirname, 'tsconfig.prod.json'),
    // rollupTypes: true,
    include: ['src/**/*.ts', 'src/**/*.tsx', 'global.d.ts'],
    // bundledPackages: ['data0']
  })]
}
