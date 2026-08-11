# WangEditor 富文本编辑器

> 基于 wangEditor v5 的富文本编辑器封装，通过独立入口 `@structure-projects/components/wang-editor` 引入。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WangEditor } from '@structure-projects/components/wang-editor'

const html = ref('<p>Hello World</p>')

const handleChange = (editor: { getHtml: () => string }) => {
  console.log('HTML:', editor.getHtml())
}
</script>

<template>
  <WangEditor
    v-model="html"
    placeholder="请输入富文本内容"
    @change="handleChange"
  />
</template>
```

## 图片上传示例

```vue
<script setup lang="ts">
const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = await res.json()
  return data.url
}
</script>

<template>
  <WangEditor
    v-model="html"
    :upload-image-fn="uploadImage"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` | `string` | ✅ | - | HTML 内容（支持 `v-model`） |
| `placeholder` | `string` | - | `'请输入内容...'` | 占位文本 |
| `uploadImageFn` | `(file: File) => Promise<string>` | - | - | 自定义图片上传函数，接收 File 返回 URL |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `value: string` | HTML 内容变化（支持 `v-model`） |
| `change` | `editor: { getHtml: () => string }` | 内容变化时触发，传入编辑器实例 |
| `created` | `editor: unknown` | 编辑器创建完成 |

## 说明

- **独立入口**：从 `@structure-projects/components/wang-editor` 导入，而非主入口。这样未安装 wangEditor 的消费者不会因模块缺失而编译失败
- **动态加载**：内部使用 `defineAsyncComponent` + 动态 `import()`，按需加载 wangEditor
- **唯一 ID**：每个实例自动生成唯一 ID，避免同页多实例冲突
- **自动销毁**：组件卸载时自动调用 `editor.destroy()`
- **样式**：`@wangeditor/editor/dist/css/style.css` 在 `onMounted` 动态加载

## 前置依赖

使用 WangEditor 组件需额外安装：

```bash
npm install @wangeditor/editor@^5.1 @wangeditor/editor-for-vue@^5.1
```

## 类型导出

```ts
import type { WangEditorProps } from '@structure-projects/components/wang-editor'
```
