# useThemeFromWujie composable

> 从 wujie 父应用同步主题的组合函数，自动监听并应用主题色。

## 基础用法

```vue
<!-- App.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeFromWujie } from '@structure-projects/components'

const { themeColor, themeMode, applyTheme } = useThemeFromWujie()

// 主动切换主题色
const changeTheme = () => {
  applyTheme('#409eff')
}

onMounted(() => {
  console.log('当前主题色:', themeColor.value)
})
</script>
```

## 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `themeColor` | `Ref<string>` | 当前主题色 |
| `themeMode` | `Ref<string>` | 当前主题模式（`light` / `dark`） |
| `applyTheme(color)` | 函数 | 主动应用主题色 |

## 同步机制

该 composable 在初始化时按以下顺序尝试获取主题：

1. **wujie props**：`window.$wujie.props.data.themeColor`
2. **localStorage**：`localStorage.getItem('themeColor')`
3. 默认值：`#13c2c2`（青色）

同时监听 wujie bus 的 `wujie-data` 事件响应主题变化。

## 主题色应用

`applyTheme(color)` 会：

- 设置 `--el-color-primary` CSS 变量
- 生成 1~9 级浅色变体（`--el-color-primary-light-1` ~ `light-9`）
- 设置 `--el-color-primary-dark-2`

## 说明

- 需在 wujie 子应用的 `App.vue` 中调用
- 不依赖 wujie 时自动降级到 localStorage
- 必须在组件的 `setup` 阶段调用，`onMounted` 会再次同步
