# TagsView 标签页视图组件

> 标签页视图组件，模拟浏览器标签页，支持多标签切换、右键菜单等。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TagsView } from '@structure-projects/components'
import type { TagView } from '@structure-projects/components'

const views = ref<TagView[]>([
  { name: 'dashboard', title: '首页', path: '/dashboard', fullPath: '/dashboard', affix: true },
  { name: 'user', title: '用户管理', path: '/system/user', fullPath: '/system/user' },
])

const currentPath = ref('/dashboard')

const handleClick = (view: TagView) => {
  console.log('点击标签:', view)
}

const handleClose = (view: TagView) => {
  console.log('关闭标签:', view)
}

const handleRefresh = (view: TagView) => {
  console.log('刷新标签:', view)
}
</script>

<template>
  <TagsView
    :views="views"
    :current-path="currentPath"
    @click="handleClick"
    @close="handleClose"
    @refresh="handleRefresh"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `views` | `TagView[]` | ✅ | - | 标签页列表 |
| `currentPath` | `string` | - | `''` | 当前激活的标签路径 |
| `visible` | `boolean` | - | `true` | 是否显示 |

### TagView

| 属性 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 路由名称 |
| `title` | `string` | 标签页标题 |
| `path` | `string` | 路由路径 |
| `fullPath` | `string` | 完整路径（含 query） |
| `icon` | `string` | 标签图标 |
| `affix` | `boolean` | 是否固定（不可关闭） |
| `keepAlive` | `boolean` | 是否缓存 |
| `query` | `Record<string, any>` | 查询参数 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `view: TagView` | 标签被点击 |
| `close` | `view: TagView` | 标签被关闭 |
| `closeOthers` | `view: TagView` | 关闭其他标签 |
| `closeLeft` | `view: TagView` | 关闭左侧标签 |
| `closeRight` | `view: TagView` | 关闭右侧标签 |
| `closeAll` | - | 关闭所有标签 |
| `refresh` | `view: TagView` | 刷新标签 |

## 说明

- 支持鼠标滚轮横向滚动，左右箭头按钮辅助导航
- 右键菜单支持：刷新、关闭当前、关闭其它、关闭右侧、关闭所有
- `affix` 标签不可关闭、不可右键"关闭当前"
- 新标签自动滚动到最右侧
- 配合 `useTagsView` composable 使用可自动管理标签页

## 类型导出

```ts
import type { TagView } from '@structure-projects/components'
```
