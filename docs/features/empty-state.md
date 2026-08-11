# EmptyState 空状态组件

> 基于 Element Plus `el-empty` 的空状态封装，提供默认布局与对齐。

## 基础用法

```vue
<script setup lang="ts">
import { EmptyState } from '@structure-projects/components'
</script>

<template>
  <EmptyState description="暂无数据" />
  <EmptyState image="search" description="未找到匹配结果" />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `description` | `string` | - | - | 空状态描述文本 |
| `image` | `'empty' \| 'error' \| 'search' \| 'network'` | - | `'empty'` | 预设图片类型 |

## Events

无自定义事件。

## 说明

- 组件水平垂直居中，上下 `40px` 内边距
- 基于 `el-empty` 封装，支持 Element Plus 预设的 4 种空状态图片
