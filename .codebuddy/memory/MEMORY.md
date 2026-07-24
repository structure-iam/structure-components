# 项目约定与记忆

## 技术栈
- Vue 3 + TypeScript + Vite
- Element Plus 2.x 组件库
- 组件库项目，产出 ES + UMD 两种格式
- 类型声明通过 vite-plugin-dts 生成

## 构建注意事项
- `vite-plugin-dts@5.x` 需要 `@vue/language-core` 被安装在顶层 node_modules（npm 可能将其嵌套在 vue-tsc 中）
- need `@element-plus/icons-vue` as an explicit dependency
- Element Plus 2.x 中 `el-dialog` 的 `:visible` 已废弃，应使用 `:model-value` + `@update:model-value`
- ESM 项目中 `__dirname` 不可用，需用 `fileURLToPath(new URL('.', import.meta.url))` 替代

## 版本号（2025-07）
- vite: ^8.1.0
- @vitejs/plugin-vue: ^6.0.0
- vite-plugin-dts: ^5.0.0
- vue-tsc: ^3.3.0
- @vue/language-core: ^3.3.8
- element-plus: ^2.9.5

## demo 目录
- `demo/` 是独立的测试工程，通过 vite alias 直接引用源码文件
- alias: `@structure-projects/components` -> `../src/index.ts`
- 有独立的 package.json、vite.config.ts、tsconfig.json
