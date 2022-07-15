import { defineConfig } from 'vite'
import path from 'path'
import strip from '@rollup/plugin-strip'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'vue-router-redirect-by-link',
    },
  },
  plugins: [
    {
      ...strip({
        include: '**/*.(ts)',
      }),
      apply: 'build',
    },
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./index.ts"',
      },
    }),
    dts({
      outputDir: './dist',
    }),
  ],
})
