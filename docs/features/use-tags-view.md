# useTagsView composable

> 标签页管理组合函数，提供标签增删、关闭策略、路由跳转等完整逻辑。

## 基础用法

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsView } from '@structure-projects/components'
import type { TagViewData } from '@structure-projects/components'

const route = useRoute()
const router = useRouter()

// 管理 <keep-alive> 的缓存列表
const cachedViews = ref<string[]>([])

const {
  visitedViews,
  addView,
  removeView,
  closeOthers,
  closeRight,
  closeAll,
  handleClick,
  handleRefresh,
  getCurrentFullPath,
} = useTagsView(router as any, cachedViews)

// 在路由变化时自动添加标签
watch(
  () => route.fullPath,
  () => addView(route as any),
  { immediate: true },
)
</script>
```

## 传入参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `router` | `RouterLike` | ✅ | 兼容的路由对象（需实现 `currentRoute` / `push` / `replace`） |
| `cacheViews` | `Ref<string[]>` | - | `<keep-alive>` 缓存列表的 ref |

## 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `visitedViews` | `Ref<TagViewData[]>` | 已访问标签列表 |
| `addView(route)` | 函数 | 添加标签（基于路由 meta 生成） |
| `removeView(view)` | 函数 | 移除标签，自动跳转到上一个标签 |
| `closeOthers(view)` | 函数 | 关闭其他标签（保留 affix 标签） |
| `closeRight(view)` | 函数 | 关闭右侧标签 |
| `closeAll()` | 函数 | 关闭所有非 affix 标签 |
| `handleClick(view)` | 函数 | 点击标签跳转 |
| `handleRefresh(view)` | 函数 | 刷新标签（配合 keep-alive） |
| `getCurrentFullPath()` | 函数 | 获取当前路径 |

## RouterLike 接口

```ts
interface RouterLike {
  currentRoute: {
    value: {
      name?: string | symbol
      path: string
      fullPath: string
      meta?: Record<string, any>
      query?: Record<string, any>
    }
  }
  push(location: string | Record<string, any>): Promise<any>
  replace(location: string | Record<string, any>): Promise<any>
}
```

## 说明

- **不硬依赖 vue-router**，仅要求实现 `RouterLike` 接口
- `addView` 从路由 `meta` 读取 `title`、`icon`、`affix`、`keepAlive` 等字段
- `removeView` 关闭当前页时自动跳转上一个标签
- `handleRefresh` 通过 `/redirect` 路径配合 keep-alive 实现刷新

## 类型导出

```ts
import type { TagViewData } from '@structure-projects/components'
```
