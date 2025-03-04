import { fileURLToPath } from "url";

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
            // 'axii': fileURLToPath(new URL('../../../axii/src/index.ts', import.meta.url)),
            // 'data0': fileURLToPath(new URL('../../../data0/src/index.ts', import.meta.url)),
            // 'statemachine0': fileURLToPath(new URL('../../../statemachine/src/index.ts', import.meta.url)),
        },
    },
};