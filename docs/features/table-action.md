# TableAction 表格操作组件

> 表格行操作按钮组组件，根据配置数组动态渲染多个操作按钮。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TableAction } from '@structure-projects/components'

const row = ref({ id: 1, name: '张三' })

const actions = [
  { key: 'edit', label: '编辑', type: 'primary' },
  { key: 'delete', label: '删除', type: 'danger' },
]

const handleAction = (key: string, row: Record<string, unknown>) => {
  switch (key) {
    case 'edit':
      console.log('编辑:', row)
      break
    case 'delete':
      console.log('删除:', row)
      break
  }
}
</script>

<template>
  <TableAction
    :row="row"
    :actions="actions"
    size="small"
    @action="handleAction"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `row` | `Record<string, unknown>` | ✅ | - | 当前行数据（透传给 action 事件） |
| `actions` | `ActionConfig[]` | ✅ | - | 按钮配置数组 |
| `size` | `'' \| 'default' \| 'small' \| 'large'` | - | `'small'` | 按钮尺寸 |

### ActionConfig

| 属性 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 操作标识（用于事件分发） |
| `label` | `string` | 按钮文本 |
| `type` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | 按钮类型 |
| `icon` | `unknown` | Element Plus 图标组件 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `action` | `(key: string, row: Record<string, unknown>)` | 任意操作按钮被点击 |

## 说明

- 按钮水平排列，间距 `8px`
- `key` 用于区分不同操作类型，`row` 透传当前行数据
