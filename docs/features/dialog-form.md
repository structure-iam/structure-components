# DialogForm 弹窗表单组件

> 基于 Element Plus `el-dialog` + `el-form` 的动态表单组件，支持 JSON 配置驱动。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DialogForm } from '@structure-projects/components'

const visible = ref(false)
const formData = ref({ name: '', status: true })
const formItems = [
  { label: '名称', prop: 'name', type: 'input', placeholder: '请输入名称', span: 24 },
  { label: '状态', prop: 'status', type: 'switch', span: 12 },
]

const handleSubmit = (data: Record<string, unknown>) => {
  console.log('提交数据:', data)
  visible.value = false
}

const handleClose = () => {
  console.log('关闭弹窗')
}
</script>

<template>
  <el-button @click="visible = true">打开表单</el-button>
  <DialogForm
    :visible="visible"
    title="编辑信息"
    :form-items="formItems"
    :form-data="formData"
    :rules="{}"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `title` | `string` | ✅ | - | 弹窗标题 |
| `visible` | `boolean` | ✅ | - | 是否显示弹窗 |
| `width` | `string` | - | `'600px'` | 弹窗宽度 |
| `formItems` | `FormItemProps[]` | ✅ | - | 表单项配置数组 |
| `formData` | `Record<string, unknown>` | ✅ | - | 表单数据对象（双向引用） |
| `rules` | `Record<string, unknown[]>` | - | - | 表单校验规则 |

### FormItemProps

| 属性 | 类型 | 说明 |
|------|------|------|
| `label` | `string` | 字段标签 |
| `prop` | `string` | 字段属性名（对应 formData 的 key） |
| `type` | `'input' \| 'textarea' \| 'select' \| 'switch'` | 控件类型 |
| `placeholder` | `string` | 占位文本 |
| `options` | `{ label: string; value: string \| number }[]` | select 选项 |
| `span` | `number` | 栅格占位，默认 24 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `submit` | `formData: Record<string, unknown>` | 点击确定且校验通过 |
| `close` | - | 点击关闭或取消 |

## 说明

- 支持的控件类型：`input`（单行）、`textarea`（多行）、`select`（下拉选择）、`switch`（开关）
- 弹窗宽度 `600px`，点击遮罩不关闭
- 取消/确定按钮自动渲染在 footer
- 需配合 `:form-data` 双向绑定，修改会直接作用于传入对象

## 关联类型

```ts
import type { FormItemProps, DialogFormProps } from '@structure-projects/components'
```
