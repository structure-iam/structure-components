# ErrorPage401 401 无权限页

> 401 Unauthorized 页面组件，展示无权限访问提示并提供返回操作。

## 基础用法

```vue
<script setup lang="ts">
import { ErrorPage401 } from '@structure-projects/components'

const handleBack = () => {
  console.log('点击返回')
}
</script>

<template>
  <ErrorPage401 home-path="/dashboard" @back="handleBack" />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `homePath` | `string` | - | `'/'` | 返回首页的路径 |
| `errImage` | `string` | - | `''` | 自定义 401 图片 URL |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `back` | - | 点击"返回"按钮时触发 |

## 说明

- 内置默认 SVG 占位图
- 包含"回首页"、"随便看看"等链接
- 点击"点我看图"会弹出图片对话框
