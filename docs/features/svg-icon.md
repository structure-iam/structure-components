# SvgIcon SVG 图标组件

> SVG Sprite 模式图标组件，配合 SVG 精灵图使用。

## 基础用法

```vue
<script setup lang="ts">
import { SvgIcon } from '@structure-projects/components'
</script>

<template>
  <SvgIcon icon-class="user" />
  <SvgIcon icon-class="logo" color="#1482f0" size="24px" />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `prefix` | `string` | - | `'icon'` | SVG symbol 前缀 |
| `iconClass` | `string` | ✅ | - | 图标名称（不含前缀） |
| `color` | `string` | - | `''` | 图标颜色 |
| `size` | `string` | - | `'1em'` | 图标尺寸 |

## Events

无自定义事件。

## 说明

- 通过 `<svg><use xlink:href="#{prefix}-{iconClass}" /></svg>` 渲染 SVG Sprite 图标
- `prefix` 默认 `icon`，即查找 `#icon-user` 形式的 symbol
- `size` 默认 `1em`，继承字体大小
- `color` 默认继承 `currentcolor`
