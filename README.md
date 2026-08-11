# @structure-projects/components

> structure-projects IAM 平台 **L1 通用基础组件库**，作为 npm 包发布，供所有 wujie 微前端子应用与领域组件库（L2）引用。

## 文档

- [组件使用文档索引](docs/README.md) — 每个组件独立的 Props / Events / 示例文档
- [设计文档](docs/IAM_COMPONENTS_DESIGN.md) — 架构设计与组件规划
- [总览与规范](docs/overview.md) — 技术栈、目录结构、约束说明

## 简介

`@structure-projects/components` 是 structure-projects 前端体系中的 **L1 层**，提供与业务无关的通用 UI 组件、子应用布局组件、composables 与基础请求封装。

| 层级 | 类型 | 包名 | 说明 |
|------|------|------|------|
| **L1** | 通用基础组件库 | `@structure-projects/components` | **本包** |
| L2 | 领域组件库 | `{domain}-ui-components` | 各领域专用组件 |
| L3 | 前端应用 | `{domain}-ui` | wujie 子应用，面向用户 |

## 特性

- **按需命名导入**：非 Vue 插件，不提供 `app.use()` 全局注册，按需 `import { DataTable } from '@structure-projects/components'`。
- **Element Plus external**：`element-plus` 作为 `peerDependency`，由消费项目自行 `app.use(ElementPlus)` 并导入 CSS。
- **TypeScript strict**：完整 Props / Emits 类型与 `.d.ts` 声明。
- **wujie 子应用友好**：内置 `PageContainer` / `TagsView` 布局组件与 `useTagsView` / `useThemeFromWujie` 组合函数。
- **可选入口**：`WangEditor` 独立入口 `@structure-projects/components/wang-editor`，避免未安装 wangeditor 的消费者编译失败。

## 技术栈

| 技术 | 说明 |
|------|------|
| 框架 | Vue 3 + TypeScript |
| 构建 | Vite (Library Mode) |
| 类型检查 | vue-tsc |
| 测试 | Vitest |
| UI 基座 | Element Plus 2.x (peerDependency) |
| 微前端 | wujie-vue3 体系 |
| HTTP | `@structure-projects/gateway-client` |

## 安装

```bash
npm install @structure-projects/components
```

> 前置依赖：消费项目需自行安装并注册 `vue@^3.5`、`element-plus@^2.9`、`@element-plus/icons-vue@^2.3`。
> `WangEditor` 为可选能力，仅在使用 `@structure-projects/components/wang-editor` 入口时需要安装 `@wangeditor/editor@^5.1` 与 `@wangeditor/editor-for-vue@^5.1`。

## 快速上手

**按需命名导入（推荐）**：

```vue
<script setup lang="ts">
import { DataTable, SearchBar, DialogForm } from '@structure-projects/components'
import type { TableColumn, FormItemProps } from '@structure-projects/components'
</script>
```

**样式引入**：

```ts
// main.ts
import '@structure-projects/components/dist/components.css'
```

> ⚠️ 本包**不是** Vue 插件，请勿 `app.use()`；Element Plus 由消费项目自行注册。

## 组件清单

### 通用组件（`@structure-projects/components`）

| 组件 | 说明 | 文档 |
|------|------|------|
| `Pagination` | 分页组件 | [Props & 示例](docs/features/pagination.md) |
| `SearchBar` | 搜索过滤栏 | [Props & 示例](docs/features/search-bar.md) |
| `DialogForm` | 弹窗表单 | [Props & 示例](docs/features/dialog-form.md) |
| `DataTable` | 增强数据表格 | [Props & 示例](docs/features/data-table.md) |
| `EmptyState` | 空状态占位 | [Props & 示例](docs/features/empty-state.md) |
| `TreeView` | 树形组件 | [Props & 示例](docs/features/tree-view.md) |
| `Breadcrumb` | 面包屑导航 | [Props & 示例](docs/features/breadcrumb.md) |
| `TableAction` | 表格行操作按钮组 | [Props & 示例](docs/features/table-action.md) |
| `MultiUpload` | 多文件上传 | [Props & 示例](docs/features/multi-upload.md) |
| `SingleUpload` | 单文件上传 | [Props & 示例](docs/features/single-upload.md) |
| `SvgIcon` | SVG 图标封装 | [Props & 示例](docs/features/svg-icon.md) |
| `IconSelect` | 图标选择器 | [Props & 示例](docs/features/icon-select.md) |
| `LangSelect` | 语言切换 | [Props & 示例](docs/features/lang-select.md) |
| `ErrorPage401` | 401 错误页 | [Props & 示例](docs/features/error-page-401.md) |
| `ErrorPage404` | 404 错误页 | [Props & 示例](docs/features/error-page-404.md) |

### 子应用布局组件

| 组件 | 说明 | 文档 |
|------|------|------|
| `PageContainer` | 子应用页面容器 | [Props & 示例](docs/features/page-container.md) |
| `TagsView` | 子应用标签页视图 | [Props & 示例](docs/features/tags-view.md) |

### Composables

| 名称 | 说明 | 文档 |
|------|------|------|
| `useTagsView` | 标签页管理 | [API & 示例](docs/features/use-tags-view.md) |
| `useThemeFromWujie` | wujie 主题同步 | [API & 示例](docs/features/use-theme-from-wujie.md) |

### WangEditor（可选入口）

```ts
import { WangEditor } from '@structure-projects/components/wang-editor'
```

- [Props & 示例](docs/features/wang-editor.md)

## Composables 与工具

```ts
// 子应用组合函数
import { useTagsView, useThemeFromWujie } from '@structure-projects/components'
import type { TagViewData } from '@structure-projects/components'

// 网关请求封装（基于 @structure-projects/gateway-client）
import { request } from '@structure-projects/components'
```

## 类型导出

```ts
import type {
  PaginationParams,
  PaginationResult,
  FormItemProps,
  TableColumn,
  DialogFormProps,
} from '@structure-projects/components'
```

## 本地开发

```bash
npm install            # 安装依赖
npm run dev            # 启动开发调试
npm run build          # 类型检查 + Vite 库模式构建
npm run test           # Vitest 单元测试（--passWithNoTests）
npm run preview        # 预览构建产物
```

## CI/CD

| Workflow | 用途 |
|----------|------|
| `.github/workflows/test.yml` | push / PR 触发：`npm ci` + `vue-tsc` + `vitest` |
| `.github/workflows/publish.yml` | release 触发：构建并发布根包到 npm |
| `.github/workflows/publish-npm.yml` | release / 手动触发：版本注入 + 构建 + npm 发布 |

- Node 版本：22 LTS
- npm scope：`@structure-projects`（公开包，`--access public`）
- Secrets：`NPM_TOKEN`

## 目录结构

```
structure-components/
├── src/
│   ├── api/            # 网关请求封装
│   ├── components/
│   │   ├── common/     # 通用组件
│   │   ├── PageContainer/
│   │   └── TagsView/
│   ├── composables/    # useTagsView / useThemeFromWujie
│   ├── types/          # 类型定义
│   ├── index.ts        # 主入口
│   └── wang-editor.ts  # WangEditor 独立入口
├── docs/
│   ├── README.md                    # 文档索引
│   ├── overview.md                  # 总览与规范
│   ├── features/                    # 组件使用文档（每个组件一份）
│   │   ├── pagination.md
│   │   ├── search-bar.md
│   │   ├── dialog-form.md
│   │   ├── data-table.md
│   │   └── ...
│   └── IAM_COMPONENTS_DESIGN.md     # 设计文档
├── .github/workflows/  # CI/CD
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 版本与文档

- 版本规范：`X.Y.Z` 语义化版本（详见 `prompts/_common/version-management.md`）
- 组件文档：[docs/features/](docs/features/) — 每个组件独立的使用说明
- 设计文档：[docs/IAM_COMPONENTS_DESIGN.md](docs/IAM_COMPONENTS_DESIGN.md)
- 文档索引：[docs/README.md](docs/README.md)
- 变更记录：`docs/{version}/changelog/`

## 约束

- **禁止** 直接用 `axios` / `fetch`，统一使用本包导出的 `request`（基于 `@structure-projects/gateway-client`）。
- **禁止** 在 L1 组件中耦合业务逻辑；业务组件归 L2 `{domain}-ui-components`。
- **MUST** 组件使用 `<script setup lang="ts">`，Props / Emits 完整类型声明。
