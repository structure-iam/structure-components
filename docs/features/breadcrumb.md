# Breadcrumb 面包屑组件

> 基于 Element Plus `el-breadcrumb` 的面包屑导航封装。

## 基础用法

```vue
<script setup lang="ts">
import { Breadcrumb } from '@structure-projects/components'

const items = [
  { label: '首页', path: '/' },
  { label: '系统管理', path: '/system' },
  { label: '用户管理' },
]
</script>

<template>
  <Breadcrumb :items="items" separator="/" />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `items` | `{ label: string; path?: string }[]` | ✅ | - | 面包屑项，`path` 存在则生成路由链接 |
| `separator` | `string` | - | `'/'` | 分隔符 |

## Events

无自定义事件。

## 说明

- 基于 `el-breadcrumb` 封装
- 未提供 `path` 的项为纯文本（不可点击），提供 `path` 的项为路由链接
