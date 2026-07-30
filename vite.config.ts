import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue(), dts({
    outputDir: 'dist',
    insertTypesEntry: true,
  })],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'wang-editor': resolve(__dirname, 'src/wang-editor.ts'),
      },
      name: 'StructureComponents',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue',
        '@structure-projects/gateway-client',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
