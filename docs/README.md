# @structure-projects/components — 总览

> IAM 平台 L1 通用基础组件库，为所有 wujie 微前端子应用与领域组件库（L2）提供通用 UI 组件。

## 分层定位

| 层级 | 类型 | 包名 | 说明 |
|------|------|------|------|
| **L1** | 通用基础组件库 | `@structure-projects/components` | **本包** |
| L2 | 领域组件库 | `{domain}-ui-components` | 各领域专用组件 |
| L3 | 前端应用 | `{domain}-ui` | wujie 子应用 |

## 特性

- **按需命名导入**：非 Vue 插件，按需 `import { DataTable }`
- **Element Plus external**：`element-plus` 为 peerDependency，消费项目自行注册
- **TypeScript strict**：完整类型声明与 `.d.ts` 产物
- **wujie 友好**：内置子应用布局组件与主题同步 composable
- **可选入口**：`WangEditor` 独立入口，未安装 wangEditor 不编译失败

## 技术栈

| 技术 | 说明 |
|------|------|
| 框架 | Vue 3 + TypeScript |
| 构建 | Vite (Library Mode) |
| UI 基座 | Element Plus 2.x (peerDependency) |
| 微前端 | wujie-vue3 |
| HTTP | `@structure-projects/gateway-client` |

## 安装

```bash
npm install @structure-projects/components
```

## 快速上手

```vue
<script setup lang="ts">
import { DataTable, Pagination, PageContainer } from '@structure-projects/components'
import type { TableColumn } from '@structure-projects/components'
</script>

<template>
  <PageContainer :max-width="1200">
    <DataTable :data="[]" :columns="[]" />
    <Pagination :page="1" :page-size="10" :total="0" />
  </PageContainer>
</template>
```

> ⚠️ 本包**不是** Vue 插件，请勿 `app.use()`。Element Plus 由消费项目自行注册。

## 组件文档索引

### 通用组件

| 组件 | 说明 | 文档 |
|------|------|------|
| `Pagination` | 分页组件 | [pagination.md](features/pagination.md) |
| `SearchBar` | 搜索过滤栏 | [search-bar.md](features/search-bar.md) |
| `DialogForm` | 弹窗表单 | [dialog-form.md](features/dialog-form.md) |
| `DataTable` | 数据表格 | [data-table.md](features/data-table.md) |
| `EmptyState` | 空状态 | [empty-state.md](features/empty-state.md) |
| `TreeView` | 树形组件 | [tree-view.md](features/tree-view.md) |
| `Breadcrumb` | 面包屑 | [breadcrumb.md](features/breadcrumb.md) |
| `TableAction` | 表格操作按钮组 | [table-action.md](features/table-action.md) |
| `MultiUpload` | 多文件上传 | [multi-upload.md](features/multi-upload.md) |
| `SingleUpload` | 单文件上传 | [single-upload.md](features/single-upload.md) |
| `SvgIcon` | SVG 图标 | [svg-icon.md](features/svg-icon.md) |
| `IconSelect` | 图标选择器 | [icon-select.md](features/icon-select.md) |
| `LangSelect` | 语言切换 | [lang-select.md](features/lang-select.md) |
| `ErrorPage401` | 401 错误页 | [error-page-401.md](features/error-page-401.md) |
| `ErrorPage404` | 404 错误页 | [error-page-404.md](features/error-page-404.md) |

### 布局组件

| 组件 | 说明 | 文档 |
|------|------|------|
| `PageContainer` | 页面容器 | [page-container.md](features/page-container.md) |
| `TagsView` | 标签页视图 | [tags-view.md](features/tags-view.md) |

### Composables

| 名称 | 说明 | 文档 |
|------|------|------|
| `useTagsView` | 标签页管理 | [use-tags-view.md](features/use-tags-view.md) |
| `useThemeFromWujie` | wujie 主题同步 | [use-theme-from-wujie.md](features/use-theme-from-wujie.md) |

### 可选入口

| 入口 | 说明 | 文档 |
|------|------|------|
| `@structure-projects/components/wang-editor` | WangEditor 富文本编辑器 | [wang-editor.md](features/wang-editor.md) |

## 类型导出

```ts
import type {
  PaginationParams,
  PaginationResult,
  FormItemProps,
  TableColumn,
  DialogFormProps,
  TagViewData,
} from '@structure-projects/components'
```

## 目录结构

```
docs/
├── README.md                    # 本文档（文档索引）
├── overview.md                  # 总览设计文档
├── features/                    # 组件使用文档
│   ├── pagination.md
│   ├── search-bar.md
│   ├── dialog-form.md
│   ├── data-table.md
│   ├── empty-state.md
│   ├── tree-view.md
│   ├── breadcrumb.md
│   ├── table-action.md
│   ├── multi-upload.md
│   ├── single-upload.md
│   ├── svg-icon.md
│   ├── icon-select.md
│   ├── lang-select.md
│   ├── error-page-401.md
│   ├── error-page-404.md
│   ├── page-container.md
│   ├── tags-view.md
│   ├── use-tags-view.md
│   ├── use-theme-from-wujie.md
│   └── wang-editor.md
└── IAM_COMPONENTS_DESIGN.md     # 详细设计文档
```

## 约束

- **禁止** 直接用 `axios` / `fetch`，统一使用导出的 `request`
- **禁止** 在 L1 组件中耦合业务逻辑；业务组件归 L2 `{domain}-ui-components`
- **MUST** 组件使用 `<script setup lang="ts">`，Props / Emits 完整类型声明
- **MUST** 按需命名导入，不使用 `app.use()` 全局注册
- **MUST** Element Plus 由消费项目自行 `app.use(ElementPlus)` + 导入 CSS
