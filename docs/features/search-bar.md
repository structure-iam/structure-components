# SearchBar 搜索栏组件

> 通用搜索过滤栏，提供关键字搜索与重置功能。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SearchBar } from '@structure-projects/components'

const keyword = ref('')

const handleSearch = (kw: string) => {
  console.log('搜索关键字:', kw)
}

const handleReset = () => {
  console.log('已重置')
}
</script>

<template>
  <SearchBar
    v-model="keyword"
    placeholder="请输入关键字搜索"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` | `string` | - | `''` | 当前搜索值（支持 `v-model`） |
| `placeholder` | `string` | - | `''` | 输入框占位文本 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `value: string` | 值变化（支持 `v-model`） |
| `search` | `keyword: string` | 点击搜索按钮或回车触发 |
| `reset` | - | 点击重置按钮触发，关键字自动清空 |

## 说明

- 内置 Element Plus `Search` 图标前缀
- 宽度固定为 `240px`
- 搜索与重置按钮间距 `12px`
- 按下回车键等同于点击"搜索"
