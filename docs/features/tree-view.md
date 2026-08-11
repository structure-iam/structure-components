# TreeView 树形组件

> 基于 Element Plus `el-tree` 的树形组件封装，提供事件透传与自定义节点插槽。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TreeView } from '@structure-projects/components'

const treeData = ref([
  {
    label: '节点 1',
    children: [
      { label: '子节点 1-1' },
      { label: '子节点 1-2' },
    ],
  },
  { label: '节点 2' },
])

const handleNodeClick = (data: Record<string, unknown>) => {
  console.log('点击节点:', data)
}

const handleCheckChange = (
  data: Record<string, unknown>,
  checked: boolean,
  indeterminate: boolean,
) => {
  console.log('勾选变化:', data, checked, indeterminate)
}
</script>

<template>
  <TreeView
    :data="treeData"
    show-checkbox
    default-expand-all
    @node-click="handleNodeClick"
    @check-change="handleCheckChange"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `data` | `Record<string, unknown>[]` | ✅ | - | 树节点数据 |
| `labelField` | `string` | - | `'label'` | 显示文本字段名 |
| `childrenField` | `string` | - | `'children'` | 子节点字段名 |
| `expandOnClickNode` | `boolean` | - | - | 点击节点是否展开 |
| `highlightCurrent` | `boolean` | - | - | 是否高亮当前节点 |
| `defaultExpandAll` | `boolean` | - | - | 是否默认展开全部 |
| `showCheckbox` | `boolean` | - | - | 是否显示复选框 |

## Slots

| 插槽 | 参数 | 说明 |
|------|------|------|
| `default` | `{ node, data }` | 自定义节点内容 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `node-click` | `(data, node)` | 节点被点击 |
| `check-change` | `(data, checked, indeterminate)` | 复选框状态变化 |

## 说明

- 节点字段名可通过 `labelField` 和 `childrenField` 自定义，默认 `label` / `children`
- 所有属性透传至 `el-tree`
