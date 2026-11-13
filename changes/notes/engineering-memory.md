# 工程备忘（structure-components）

> 来源：原 `.codebuddy/memory/`，整理为长期约定。

## 定位与技术栈

- L1 公共组件库，npm 包，产出 ES 与 UMD 两种格式，类型声明由 vite-plugin-dts 生成。
- Vue 3 + TypeScript + Vite + Element Plus 2.x。
- `demo/` 是独立测试工程，通过 Vite alias `@structure-projects/components -> ../src/index.ts` 直接引用源码，自带 package.json/vite.config/tsconfig。

## 依赖与构建注意

- `vite-plugin-dts@5.x` 要求 `@vue/language-core` 安装在顶层 node_modules（npm 可能把它嵌套进 vue-tsc）。
- `@element-plus/icons-vue` 必须是显式依赖。
- ESM 中没有 `__dirname`，用 `fileURLToPath(new URL('.', import.meta.url))` 替代。
- tsconfig 已开启 `noEmit`，不要再配置 declaration/declarationMap/outDir，否则冲突。

## 组件约定

- Element Plus 2.x 的 `el-dialog` 已废弃 `:visible`，统一用 `:model-value` + `@update:model-value`。
- 封装 v-model 组件时（如 SearchBar）需 `watch` 外部 `modelValue` 同步到本地 ref，避免双向绑定不完整。
- 透传组件属性时（如 TreeView 的 showCheckbox）要显式绑定到 `el-tree :show-checkbox`，不要声明了 prop 却不下发。

## 版本基线（2025-07）

vite ^8.1.0、@vitejs/plugin-vue ^6.0.0、vite-plugin-dts ^5.0.0、vue-tsc ^3.3.0、@vue/language-core ^3.3.8、element-plus ^2.9.5。
