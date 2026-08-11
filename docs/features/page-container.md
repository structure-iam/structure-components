# PageContainer 页面容器组件

> 子应用页面容器组件，提供统一的最大宽度与内边距约束。

## 基础用法

```vue
<script setup lang="ts">
import { PageContainer } from '@structure-projects/components'
</script>

<template>
  <PageContainer :max-width="1200" :padding="24">
    <h1>页面内容</h1>
    <p>这里是页面主体...</p>
  </PageContainer>
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `maxWidth` | `number \| string` | - | `1200` | 最大宽度，`0` 表示不限宽 |
| `padding` | `number \| string` | - | `20` | 内边距 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 页面主体内容 |

## Events

无自定义事件。

## 说明

- 内部使用 CSS 变量 `--pc-max-width` 和 `--pc-padding` 控制样式
- 宽度满屏，内部居中对齐
- 适用于子应用的主内容区域包装
