# ErrorPage404 404 未找到页

> 404 Not Found 页面组件，带动画效果的找不到页面提示。

## 基础用法

```vue
<script setup lang="ts">
import { ErrorPage404 } from '@structure-projects/components'
</script>

<template>
  <ErrorPage404 home-path="/" />
  <ErrorPage404 home-path="/dashboard" message="您访问的页面已下线" />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `homePath` | `string` | - | `'/'` | 返回首页的路径 |
| `message` | `string` | - | `''` | 自定义提示信息（默认英文提示） |

## Events

无自定义事件。

## 说明

- 包含 CSS 动画（云层移动 + 文字上滑）
- 居中定位（`absolute 50% translate`）
- 默认提示："The webmaster said that you can not enter this page..."
- 自定义 `message` 时显示传入的文案
- 点击 "Back to home" 链接跳转至 `homePath`
