# 通用组件库设计 (structure-components)

> **所属模块**：`structure-components`
> **npm 包名**：`@structure-projects/components`
> **发布版本**：`^1.0.0`
> **类型**：L1 通用基础组件库

---

## 1. 模块职责

`structure-components` 是 IAM 平台的 L1 级通用组件库，作为 npm 包发布，被所有前端应用引用。

| 层级 | 类型 | 包名 | 说明 |
|------|------|------|------|
| **L1** | 通用基础组件库 | `@structure-projects/components` | **本模块** |
| L2 | 领域组件库 | `{domain}-ui-components` | 各领域专用组件 |
| L3 | 前端应用 | `{domain}-ui` | 面向用户的完整应用 |

---

## 2. 技术栈

| 技术 | 版本/说明 |
|------|----------|
| 框架 | Vue 3 + TypeScript |
| 构建工具 | Vite (Library Mode) |
| 发布方式 | npm publish |
| 外部依赖 | Element Plus 2.x (peerDependency) |

---

## 3. 组件清单

### 3.1 现有组件 (8个)

| 组件名 | 文件 | 说明 |
|--------|------|------|
| `StTable` | `StTable.vue` | 增强型表格组件（分页、排序、筛选、选择） |
| `StForm` | `StForm.vue` | 动态表单组件（JSON Schema 驱动） |
| `StDialog` | `StDialog.vue` | 弹窗封装（拖拽、最大化、确认） |
| `StSearch` | `StSearch.vue` | 搜索过滤栏（多条件组合搜索） |
| `StTree` | `StTree.vue` | 树形组件（懒加载、拖拽、勾选） |
| `StUpload` | `StUpload.vue` | 文件上传组件（预签名直传 S3） |
| `StIcon` | `StIcon.vue` | 图标组件（SVG Icon 封装） |
| `StEmpty` | `StEmpty.vue` | 空状态组件 |

### 3.2 待补充组件 (7个)

| 组件名 | 说明 | 优先级 |
|--------|------|--------|
| `StCard` | 卡片容器组件 | 高 |
| `StDescriptions` | 描述列表组件 | 高 |
| `StDrawer` | 抽屉组件封装 | 中 |
| `StImagePreview` | 图片预览组件 | 中 |
| `StBreadcrumb` | 面包屑组件 | 低 |
| `StTagGroup` | 标签组组件 | 低 |
| `StSteps` | 步骤条组件 | 低 |

---

## 4. 导出入口

```typescript
// src/index.ts - 主入口
export { default as StTable } from './components/StTable.vue';
export { default as StForm } from './components/StForm.vue';
export { default as StDialog } from './components/StDialog.vue';
export { default as StSearch } from './components/StSearch.vue';
export { default as StTree } from './components/StTree.vue';
export { default as StUpload } from './components/StUpload.vue';
export { default as StIcon } from './components/StIcon.vue';
export { default as StEmpty } from './components/StEmpty.vue';

// 类型导出
export type { StTableProps, StTableColumn } from './types/table';
export type { StFormProps, StFormField } from './types/form';
export type { StUploadProps, StUploadFile } from './types/upload';
```

---

## 5. 组件设计规范

### 5.1 命名规范

- 组件文件名：PascalCase（如 `StTable.vue`）
- 组件注册名：kebab-case（如 `<st-table>`）
- 组件前缀：统一使用 `St`（Structure 缩写）

### 5.2 Props 规范

```typescript
// 遵循 Element Plus 2.x 规范
interface StTableProps {
  // size 使用 '' | 'default' | 'small' | 'large'（非 'medium'）
  size?: '' | 'default' | 'small' | 'large';
  // v-model 用 :model-value + emit('update:model-value')
  modelValue?: any;
  // 表格专用
  columns: StTableColumn[];
  data: Record<string, any>[];
  loading?: boolean;
  pagination?: PaginationConfig;
}
```

### 5.3 事件规范

- 使用 `defineEmits` 声明事件类型
- 遵循 Vue 3 `v-model` 规范：`update:modelValue`
- 事件名使用 kebab-case

### 5.4 组件通信

- Props Down / Events Up（单向数据流）
- 复杂状态使用 `provide/inject`
- 避免跨组件直接引用（依赖倒置）

### 5.5 样式规范

- 使用 Scoped CSS
- 支持 CSS 变量主题定制
- 不直接引用 Element Plus 内部样式变量

---

## 6. 构建配置要点

### 6.1 Vite Library Mode

```typescript
// vite.config.ts 关键配置
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'StructureComponents',
      fileName: 'structure-components',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
});
```

### 6.2 package.json 关键字段

```json
{
  "name": "@structure-projects/components",
  "version": "1.0.0",
  "main": "./dist/structure-components.umd.js",
  "module": "./dist/structure-components.es.js",
  "types": "./dist/types/index.d.ts",
  "peerDependencies": {
    "vue": "^3.0.0",
    "element-plus": "^2.0.0"
  }
}
```

---

## 7. 使用方式

### 7.1 安装

```bash
npm install @structure-projects/components
```

### 7.2 全局注册

```typescript
// main.ts
import { createApp } from 'vue';
import StructureComponents from '@structure-projects/components';
import '@structure-projects/components/dist/style.css';

const app = createApp(App);
app.use(StructureComponents);
app.mount('#app');
```

### 7.3 按需引入

```vue
<script setup lang="ts">
import { StTable, StForm } from '@structure-projects/components';
</script>
```

---

## 8. 关键设计决策

### 8.1 为何独立 npm 包

- L1 组件是所有前端应用的**基础依赖**
- 独立 npm 包避免循环依赖和重复打包
- 版本化管理，各应用可独立升级
- 支持 UMD/ES Module 双格式

### 8.2 为何不包含业务逻辑

- L1 组件是**纯 UI 组件**，不耦合任何业务
- 业务组件统一放在 L2 `{domain}-ui-components` 中
- 遵循关注点分离原则

### 8.3 Vite alias 规范

- 使用 npm 包方式引用：`import { StTable } from '@structure-projects/components'`
- **不设置** Vite alias 指向本地目录
- 确保从 `node_modules` 正确解析

---

## 9. 待确认清单

| # | 不一致项 | 当前状态 | 建议 |
|---|---------|---------|------|
| 1 | 样式隔离 | 当前使用 Scoped CSS，是否需要 CSS Module | **待确认**：确定样式隔离方案 |
| 2 | 单元测试 | 未建立组件测试框架 | **待确认**：是否需要 Vitest + Vue Test Utils |
| 3 | Storybook | 无组件文档/预览系统 | **待确认**：是否需要 Storybook 做组件展示文档 |
| 4 | 待补充组件 | 7 个组件待开发 | **待确认**：排列优先级和开发计划 |
