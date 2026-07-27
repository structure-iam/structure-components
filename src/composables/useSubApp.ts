import { ref, onMounted, type Ref } from 'vue'

export interface TagViewData {
  name: string
  title: string
  path: string
  fullPath: string
  icon?: string
  affix?: boolean
  keepAlive?: boolean
  query?: Record<string, any>
}

/** 通用 router 接口（避免硬依赖 vue-router） */
interface RouterLike {
  currentRoute: { value: { name?: string | symbol, path: string, fullPath: string, meta?: Record<string, any>, query?: Record<string, any> } }
  push(location: string | Record<string, any>): Promise<any>
  replace(location: string | Record<string, any>): Promise<any>
}

/**
 * 在子应用中使用 TagsView 的 composable
 * 管理已访问路由的标签页列表
 */
export function useTagsView(router: RouterLike, cacheViews?: Ref<string[]>) {
  const visitedViews = ref<TagViewData[]>([])

  /** 添加一个标签 */
  function addView(route: RouterLike['currentRoute']['value'] | any) {
    if (!route.name) return
    const { name, path, fullPath, meta } = route
    const existing = visitedViews.value.find((v) => v.fullPath === fullPath)
    if (existing) return

    visitedViews.value.push({
      name: String(name),
      title: (meta?.title as string) || String(name),
      path: path as string,
      fullPath: fullPath as string,
      icon: meta?.icon as string | undefined,
      affix: meta?.affix as boolean | undefined,
      keepAlive: meta?.keepAlive !== false,
      query: route.query,
    })
  }

  /** 移除一个标签 */
  function removeView(view: TagViewData) {
    const i = visitedViews.value.findIndex((v) => v.fullPath === view.fullPath)
    if (i < 0) return
    visitedViews.value.splice(i, 1)

    // 如果关闭的是当前页，跳到上一个标签
    if (view.fullPath === getCurrentFullPath()) {
      const nextView = visitedViews.value[Math.max(0, i - 1)]
      if (nextView) {
        router.push(nextView.fullPath)
      }
    }
  }

  /** 关闭其他标签 */
  function closeOthers(view: TagViewData) {
    visitedViews.value = visitedViews.value.filter(
      (v) => v.fullPath === view.fullPath || v.affix,
    )
    router.push(view.fullPath)
  }

  /** 关闭右侧标签 */
  function closeRight(view: TagViewData) {
    const idx = visitedViews.value.findIndex((v) => v.fullPath === view.fullPath)
    if (idx < 0) return
    visitedViews.value = visitedViews.value.slice(0, idx + 1)
    router.push(view.fullPath)
  }

  /** 关闭所有 */
  function closeAll() {
    visitedViews.value = visitedViews.value.filter((v) => v.affix)
    if (visitedViews.value.length > 0) {
      router.push(visitedViews.value[0].fullPath)
    }
  }

  function getCurrentFullPath() {
    return router.currentRoute.value.fullPath
  }

  /** 点击标签跳转 */
  function handleClick(view: TagViewData) {
    router.push(view.fullPath)
  }

  /** 刷新视图 */
  function handleRefresh(view: TagViewData) {
    if (cacheViews && view.name) {
      const idx = cacheViews.value.indexOf(view.name)
      if (idx > -1) cacheViews.value.splice(idx, 1)
    }
    router.replace({ path: '/redirect' + view.fullPath, query: view.query })
  }

  return {
    visitedViews,
    addView,
    removeView,
    closeOthers,
    closeRight,
    closeAll,
    handleClick,
    handleRefresh,
    getCurrentFullPath,
  }
}

/**
 * 从 wujie 父应用 + localStorage 同步主题 CSS 变量
 * 子应用在 App.vue 中调用
 */
export function useThemeFromWujie() {
  const themeColor = ref('#13c2c2')
  const themeMode = ref('light')

  function applyTheme(color: string) {
    themeColor.value = color
    const root = document.documentElement

    // Element Plus 主题色
    root.style.setProperty('--el-color-primary', color)

    // 生成浅色变体 (1-9)
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    for (let i = 1; i <= 9; i++) {
      const f = (10 - i) / 10
      const lr = Math.round(r + (255 - r) * f)
      const lg = Math.round(g + (255 - g) * f)
      const lb = Math.round(b + (255 - b) * f)
      root.style.setProperty(
        `--el-color-primary-light-${i}`,
        `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`,
      )
    }

    root.style.setProperty('--el-color-primary-dark-2', color)
  }

  function trySync() {
    const w = window as any

    // 方式一：从 wujie props 获取
    if (w.__POWERED_BY_WUJIE__ && w.$wujie?.props?.data) {
      const data = w.$wujie.props.data
      if (data.themeColor) applyTheme(data.themeColor)
      if (data.theme) themeMode.value = data.theme

      // 监听数据变化
      if (w.$wujie?.bus) {
        w.$wujie.bus.$on('wujie-data', (evtData: any) => {
          if (evtData?.themeColor) applyTheme(evtData.themeColor)
          if (evtData?.theme) themeMode.value = evtData.theme
        })
      }
    }

    // 方式二：从 localStorage 获取（portal 会在加载子应用前写入）
    const lsColor = localStorage.getItem('themeColor')
    if (lsColor) applyTheme(lsColor)

    const lsTheme = localStorage.getItem('theme')
    if (lsTheme) themeMode.value = lsTheme
  }

  trySync()

  onMounted(() => {
    trySync()
  })

  return { themeColor, themeMode, applyTheme }
}
