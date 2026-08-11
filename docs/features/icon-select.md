# IconSelect 图标选择器组件

> 图标选择器，支持 SVG 图标与 Element Plus 图标的可视化选择。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { IconSelect } from '@structure-projects/components'

const selectedIcon = ref('icon-user')
const svgIcons = ['user', 'logo', 'settings', 'home']
</script>

<template>
  <IconSelect
    v-model="selectedIcon"
    :svg-icons="svgIcons"
    width="400px"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` | `string` | ✅ | - | 当前选中的图标名（支持 `v-model`） |
| `width` | `string` | - | `'500px'` | 选择器宽度 |
| `svgIcons` | `string[]` | - | `[]` | 可用 SVG 图标名称列表 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `value: string` | 选中图标变化（支持 `v-model`） |

## 说明

- 包含两个 Tab：**SVG 图标**（从 `svgIcons` 数组获取）和 **Element 图标**（从 `@element-plus/icons-vue` 全量获取）
- 选中 SVG 图标时返回原名（如 `user`），选中 Element 图标时返回 `el-icon-{name}` 前缀
- 支持关键字搜索过滤
- 点击输入框弹出选择面板
