# @structure-projects/components — 总览

> L1 通用基础组件库总览文档，涵盖架构定位、技术栈、能力边界与设计约束。

## 模块职责

`@structure-projects/components` 是 structure-projects IAM 平台的 **L1 级通用组件库**，作为 npm 包发布，被所有前端应用引用。

| 层级 | 类型 | 包名 | 说明 |
|------|------|------|------|
| **L1** | 通用基础组件库 | `@structure-projects/components` | **本模块** |
| L2 | 领域组件库 | `{domain}-ui-components` | 各领域专用组件 |
| L3 | 前端应用 | `{domain}-ui` | wujie 子应用 |

## 架构约束

- **MUST** L1 组件不耦合任何业务逻辑，业务组件归 L2
- **MUST** 按需命名导入，不使用 `app.use()` 全局注册
- **MUST** Element Plus 为 peerDependency，消费项目自行注册
- **MUST** 使用 `@structure-projects/gateway-client` 的 `request`
- **MUST** 组件使用 `<script setup lang="ts">`，Props/Emits 完整类型声明

## 技术栈

| 技术 | 版本/说明 |
|------|----------|
| 框架 | Vue 3 + TypeScript |
| 构建 | Vite (Library Mode) |
| 发布 | npm publish (`@structure-projects` scope) |
| 外部依赖 | Element Plus 2.x (peerDependency) |
| 微前端 | wujie-vue3 |
| HTTP | `@structure-projects/gateway-client` |
| 测试 | Vitest |

## 目录结构

```
structure-components/
├── src/
│   ├── api/            # 网关请求封装（request）
│   ├── components/
│   │   ├── common/     # 通用组件（15 个）
│   │   ├── PageContainer/  # 布局组件
│   │   └── TagsView/       # 标签页视图
│   ├── composables/    # useTagsView / useThemeFromWujie
│   ├── types/          # 类型定义
│   ├── index.ts        # 主入口
│   └── wang-editor.ts  # WangEditor 可选入口
├── docs/               # 文档
└── package.json
```

## 导出结构

### 主入口 `@structure-projects/components`

- 15 个通用组件
- 2 个布局组件（PageContainer, TagsView）
- 2 个 composables（useTagsView, useThemeFromWujie）
- request 封装
- 类型导出（PaginationParams, FormItemProps, TableColumn 等）

### 可选入口 `@structure-projects/components/wang-editor`

- WangEditor 富文本编辑器组件
- 动态导入，未安装 wangEditor 不影响其他组件编译

## 构建配置要点

- Vite Library Mode，入口 `src/index.ts`
- Element Plus 为 external，避免打包膨胀
- TypeScript strict 模式
- `vite-plugin-dts` 自动生成类型声明

## 文档体系

- [组件使用文档索引](README.md) — 每个组件独立的 Props/Events/示例
- [设计文档](IAM_COMPONENTS_DESIGN.md) — 架构设计与组件规划
- [Changelog](../{version}/changelog/) — 版本变更记录

## 已发布版本

| 版本 | 说明 |
|------|------|
| `1.0.3` | 当前版本 |
