# SingleUpload 单文件上传组件

> 单图上传组件，基于 Element Plus `el-upload`，通过 props 注入上传 API。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SingleUpload } from '@structure-projects/components'

const imgUrl = ref('')

// 上传函数：接收 File，返回 URL 字符串
const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = await res.json()
  return data.url
}
</script>

<template>
  <SingleUpload
    v-model="imgUrl"
    :max-size="5242880"
    :upload-fn="handleUpload"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` | `string` | ✅ | - | 图片 URL（支持 `v-model`） |
| `maxSize` | `number` | - | `2 * 1024 * 1024` | 文件最大体积（bytes），默认 2MB |
| `uploadFn` | `(file: File) => Promise<string>` | ✅ | - | 上传函数，接收 File 返回 URL 字符串 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `value: string` | URL 变化（支持 `v-model`） |

## 说明

- 使用 `picture-card` 风格，`178 × 178px` 预览区域
- 超过 `maxSize` 会弹出警告提示
- 上传成功后自动更新 `modelValue`

## 类型导出

```ts
import type { SingleUploadProps } from '@structure-projects/components'
```
