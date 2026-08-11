# LangSelect 语言选择组件

> 语言切换下拉选择组件，配合 i18n 场景使用。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LangSelect } from '@structure-projects/components'
import type { LanguageOption } from '@structure-projects/components'

const currentLang = ref('zh-CN')

const languages: LanguageOption[] = [
  { key: 'zh-CN', label: '简体中文' },
  { key: 'en-US', label: 'English' },
]

const handleChange = (lang: string) => {
  console.log('切换语言:', lang)
}
</script>

<template>
  <LangSelect
    :languages="languages"
    :current-language="currentLang"
    @change="handleChange"
  />
</template>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `languages` | `LanguageOption[]` | ✅ | - | 可用语言列表 |
| `currentLanguage` | `string` | ✅ | - | 当前语言 key |

### LanguageOption

| 属性 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 语言标识（如 `zh-CN`、`en-US`） |
| `label` | `string` | 语言显示名称 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `change` | `lang: string` | 切换到新语言时触发（切换到相同语言不触发） |

## 说明

- 基于 `el-dropdown` 实现，点击语言图标触发下拉
- 当前语言对应的选项自动禁用
- 内含 SVG 图标 `language`（需在 SVG Sprite 中注册 `icon-language`）

## 类型导出

```ts
import type { LanguageOption } from '@structure-projects/components'
```
