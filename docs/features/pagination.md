# Pagination 分页组件

> 基于 Element Plus `el-pagination` 的分页封装组件，提供双向绑定能力。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '@structure-projects/components'

const page = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handlePageChange = (val: number) => {
  console.log('当前页:', val)
}
</script>

<template>
  <Pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page="page"
    :page-size="pageSize"
    :total="total"
    @update:page="handlePageChange"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `page` | `number` | ✅ | - | 当前页码 |
| `pageNum` | `number` | ✅ | - | 当前页码（别名，兼容后端字段） |
| `pageSize` | `number` | ✅ | - | 每页条数 |
| `total` | `number` | ✅ | - | 总条数 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:page` | `value: number` | 当前页变化（支持 `v-model:page`） |
| `update:pageSize` | `value: number` | 每页条数变化（支持 `v-model:page-size`） |

## 说明

- 内部使用 `el-pagination`，`page-sizes` 支持 `[10, 20, 50, 100]`
- 布局为 `total, sizes, prev, pager, next, jumper`
- `page` 与 `pageNum` 均为必填，`pageNum` 用于兼容后端分页参数

## 关联类型

```ts
import type { PaginationParams, PaginationResult } from '@structure-projects/components'

// 请求参数
interface PaginationParams {
  page: number
  pageNum: number
  pageSize: number
  keyword?: string
}

// 响应结果
interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageNum: number
  pageSize: number
}
```
