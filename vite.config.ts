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
    // emptyOutDir: true 默认不需要，vite build 会自动清理
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'StructureComponents',
      fileName: 'index',
      formats: ['es', 'umd'],
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
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          '@structure-projects/gateway-client': 'GatewayClient',
          '@wangeditor/editor': 'WangEditor',
          '@wangeditor/editor-for-vue': 'WangEditorForVue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
