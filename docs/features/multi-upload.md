# MultiUpload 多文件上传组件

> 多图上传组件，基于 Element Plus `el-upload`，通过 props 注入上传与删除 API。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MultiUpload } from '@structure-projects/components'

const fileUrls = ref<string[]>([])

// 上传函数：接收 File，返回 { name, url }
const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = await res.json()
  return { name: data.name, url: data.url }
}

// 删除函数（可选）：接收文件路径
const handleDelete = async (filePath: string) => {
  await fetch(`/api/upload?url=${encodeURIComponent(filePath)}`, { method: 'DELETE' })
}
</script>

<template>
  <MultiUpload
    v-model="fileUrls"
    :limit="5"
    :max-size="5242880"
    :upload-fn="handleUpload"
    :delete-fn="handleDelete"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` | `string[]` | ✅ | - | 文件 URL 数组（支持 `v-model`） |
| `limit` | `number` | - | `10` | 最大上传数量 |
| `maxSize` | `number` | - | `2 * 1024 * 1024` | 单文件最大体积（bytes），默认 2MB |
| `uploadFn` | `(file: File) => Promise<{ name: string; url: string }>` | ✅ | - | 上传函数，接收 File 返回文件信息 |
| `deleteFn` | `(filePath: string) => Promise<void>` | - | - | 删除函数，接收文件路径 |
| `beforeUpload` | `(file: File) => boolean \| Promise<boolean>` | - | - | 自定义上传前校验 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `value: string[]` | 文件列表变化（支持 `v-model`） |

## 说明

- 使用 `picture-card` 列表类型，支持预览
- 超过 `maxSize` 会弹出警告提示
- 上传成功后自动更新 `modelValue` 为文件 URL 数组
- 删除时若提供 `deleteFn` 会先调用远端删除，再更新列表
- 文件格式校验默认走 `el-upload` 的 `accept` 属性，可通过 `beforeUpload` 扩展

## 类型导出

```ts
import type { MultiUploadProps } from '@structure-projects/components'
```
