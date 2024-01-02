import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        isolate: false,
        poolOptions: {
            forks: {
                isolate: false,
            },
        },
    },
    plugins: [
        swc.vite({
            module: { type: 'es6' },
        }),
        tsconfigPaths(),
    ],
});
