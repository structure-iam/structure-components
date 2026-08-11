# DataTable 数据表格组件

> 基于 Element Plus `el-table` 的增强数据表格，支持列配置驱动与自定义操作列。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DataTable } from '@structure-projects/components'
import type { TableColumn } from '@structure-projects/components'

const data = ref([
  { id: 1, name: '张三', status: 'active' },
  { id: 2, name: '李四', status: 'inactive' },
])

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: '80px' },
  { prop: 'name', label: '姓名', width: '120px' },
  {
    prop: 'status',
    label: '状态',
    formatter: (row, col) => row.status === 'active' ? '启用' : '禁用',
  },
]

const handleEdit = (row: Record<string, unknown>) => {
  console.log('编辑:', row)
}

const handleDelete = (row: Record<string, unknown>) => {
  console.log('删除:', row)
}
</script>

<template>
  <DataTable
    :data="data"
    :columns="columns"
    border
    striped
    :has-actions="true"
    action-width="180px"
  >
    <template #actions="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </DataTable>
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `data` | `Record<string, unknown>[]` | ✅ | - | 表格数据 |
| `columns` | `TableColumn[]` | ✅ | - | 列配置 |
| `border` | `boolean` | - | - | 是否显示边框 |
| `striped` | `boolean` | - | - | 是否斑马纹 |
| `size` | `'' \| 'large' \| 'default' \| 'small'` | - | `'default'` | 表格尺寸 |
| `maxHeight` | `string \| number` | - | - | 最大高度 |
| `hasActions` | `boolean` | - | `false` | 是否显示操作列 |
| `actionWidth` | `string` | - | `'200px'` | 操作列宽度 |

### TableColumn

| 属性 | 类型 | 说明 |
|------|------|------|
| `prop` | `string` | 字段属性名 |
| `label` | `string` | 列标题 |
| `width` | `string \| number` | 列宽 |
| `align` | `'left' \| 'center' \| 'right'` | 对齐方式，默认 `'center'` |
| `formatter` | `(row, column) => string` | 自定义格式化函数 |

## Slots

| 插槽 | 参数 | 说明 |
|------|------|------|
| `actions` | `{ row: Record<string, unknown> }` | 操作列内容（需 `has-actions` 为 true） |

## Events

无自定义事件。表格内部事件通过 Element Plus 原生 API 获取。

## 说明

- 使用 `columns` 配置驱动列渲染，自动渲染 `el-table-column`
- `formatter` 支持自定义显示格式
- 操作列通过 `#actions` 插槽注入自定义按钮
- 列默认居中对齐

## 关联类型

```ts
import type { TableColumn } from '@structure-projects/components'
```
