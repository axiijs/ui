import {resolve} from "path";

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  define: {
    __DEV__: true,
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        list: resolve(__dirname, 'list.html'),
        forms: resolve(__dirname, 'forms.html'),
        mail: resolve(__dirname, 'mail.html'),
        tasks: resolve(__dirname, 'tasks.html'),
      },
    },
    resolve: {
      dedupe: ['data0', 'axii']
    }
  },

}
