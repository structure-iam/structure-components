<template>
  <div class="tags-view" v-if="visible && views.length > 0">
    <div class="tags-view__actions">
      <el-icon
        :size="14"
        class="tags-view__arrow"
        :class="{ disabled: scrollLeft <= 0 }"
        @click="scrollTo('left')"
      >
        <ArrowLeft />
      </el-icon>
    </div>
    <div ref="scrollContainer" class="tags-view__scroll" @wheel.prevent="handleWheel">
      <div ref="scrollContent" class="tags-view__content" :style="scrollStyle">
        <span
          v-for="view in views"
          :key="view.fullPath"
          class="tags-view__tag"
          :class="{ active: isActive(view), affix: view.affix }"
          @click="handleClick(view)"
          @contextmenu.prevent="openContextMenu($event, view)"
        >
          <span class="tags-view__tag-title">{{ view.title }}</span>
          <el-icon
            v-if="!view.affix"
            :size="12"
            class="tags-view__tag-close"
            @click.stop="handleClose(view)"
          >
            <Close />
          </el-icon>
        </span>
      </div>
    </div>
    <div class="tags-view__actions">
      <el-icon
        :size="14"
        class="tags-view__arrow"
        :class="{ disabled: scrollRight <= 0 }"
        @click="scrollTo('right')"
      >
        <ArrowRight />
      </el-icon>
    </div>

    <!-- 右键菜单 -->
    <Teleport to="body">
      <ul
        v-show="contextMenuVisible"
        class="tags-view__context-menu"
        :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
      >
        <li @click="refreshView">刷新页面</li>
        <li :class="{ disabled: currentView?.affix }" @click="closeView">关闭当前</li>
        <li @click="closeOthers">关闭其它</li>
        <li @click="closeRight">关闭右侧</li>
        <li @click="closeAll">关闭所有</li>
      </ul>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, ArrowRight, Close } from '@element-plus/icons-vue'

defineOptions({ name: 'TagsView' })

export interface TagView {
  name: string
  title: string
  path: string
  fullPath: string
  icon?: string
  affix?: boolean
  keepAlive?: boolean
  query?: Record<string, any>
}

const props = withDefaults(defineProps<{
  views: TagView[]
  currentPath?: string
  visible?: boolean
}>(), {
  views: () => [],
  currentPath: '',
  visible: true,
})

const emit = defineEmits<{
  click: [view: TagView]
  close: [view: TagView]
  closeOthers: [view: TagView]
  closeLeft: [view: TagView]
  closeRight: [view: TagView]
  closeAll: []
  refresh: [view: TagView]
}>()

// 滚动相关
const scrollContainer = ref<HTMLElement>()
const scrollContent = ref<HTMLElement>()
const scrollLeft = ref(0)
const scrollRight = ref(0)

const scrollStyle = computed(() => ({
  transform: `translateX(${scrollLeft.value}px)`,
  transition: 'transform 0.3s',
}))

function isActive(view: TagView) {
  return view.fullPath === props.currentPath
}

function handleClick(view: TagView) {
  emit('click', view)
}

function handleClose(view: TagView) {
  emit('close', view)
}

function scrollTo(direction: 'left' | 'right') {
  if (!scrollContainer.value) return
  const distance = 200
  const maxScroll = (scrollContent.value?.clientWidth || 0) - (scrollContainer.value?.clientWidth || 0)

  if (direction === 'left') {
    scrollLeft.value = Math.min(scrollLeft.value + distance, 0)
  } else {
    scrollLeft.value = Math.max(scrollLeft.value - distance, -maxScroll)
  }
  updateScrollStatus()
}

function handleWheel(e: WheelEvent) {
  const delta = e.deltaY
  if (!scrollContainer.value) return
  const maxScroll = (scrollContent.value?.clientWidth || 0) - (scrollContainer.value?.clientWidth || 0)

  scrollLeft.value = Math.max(
    Math.min(scrollLeft.value - delta, 0),
    -maxScroll,
  )
  updateScrollStatus()
}

function updateScrollStatus() {
  if (!scrollContainer.value || !scrollContent.value) return
  const maxScroll = (scrollContent.value?.clientWidth || 0) - (scrollContainer.value?.clientWidth || 0)
  scrollRight.value = scrollLeft.value + maxScroll
}

watch(() => props.views, () => {
  // 新标签页滚动到最右侧
  scrollLeft.value = -(scrollContent.value?.clientWidth || 0) + (scrollContainer.value?.clientWidth || 0)
  updateScrollStatus()
}, { flush: 'post' })

onMounted(() => {
  updateScrollStatus()
  document.addEventListener('click', closeContextMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu)
})

// 右键菜单
const contextMenuVisible = ref(false)
const contextMenuLeft = ref(0)
const contextMenuTop = ref(0)
const currentView = ref<TagView | null>(null)

function openContextMenu(e: MouseEvent, view: TagView) {
  contextMenuLeft.value = e.clientX
  contextMenuTop.value = e.clientY
  contextMenuVisible.value = true
  currentView.value = view
}

function closeContextMenu() {
  contextMenuVisible.value = false
}

function refreshView() {
  if (currentView.value) emit('refresh', currentView.value)
  closeContextMenu()
}

function closeView() {
  if (currentView.value && !currentView.value.affix) emit('close', currentView.value)
  closeContextMenu()
}

function closeOthers() {
  if (currentView.value) emit('closeOthers', currentView.value)
  closeContextMenu()
}

function closeRight() {
  if (currentView.value) emit('closeRight', currentView.value)
  closeContextMenu()
}

function closeAll() {
  emit('closeAll')
  closeContextMenu()
}
</script>

<style lang="scss" scoped>
.tags-view {
  display: flex;
  align-items: center;
  height: 40px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  padding: 0 8px;
  overflow: hidden;
  user-select: none;

  &__actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__arrow {
    cursor: pointer;
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 2px;

    &:hover {
      color: var(--el-color-primary);
    }

    &.disabled {
      color: var(--el-text-color-placeholder);
      cursor: not-allowed;
    }
  }

  &__scroll {
    flex: 1;
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    padding: 0 4px;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    height: 28px;
    padding: 0 10px;
    margin: 0 2px;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--el-text-color-regular);
    background: var(--el-fill-color-light);
    border: 1px solid var(--el-border-color-lighter);
    transition: all 0.2s;

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    &.active {
      color: #fff;
      background: var(--el-color-primary);
      border-color: var(--el-color-primary);

      .tags-view__tag-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    &.affix {
      padding-right: 10px;
    }
  }

  &__tag-title {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__tag-close {
    font-size: 12px;
    margin-left: 6px;
    border-radius: 50%;
    padding: 1px;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}

// 右键菜单
.tags-view__context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 120px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  margin: 0;
  list-style: none;

  li {
    padding: 6px 16px;
    font-size: 13px;
    color: var(--el-text-color-regular);
    cursor: pointer;

    &:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }

    &.disabled {
      color: var(--el-text-color-placeholder);
      cursor: not-allowed;

      &:hover {
        background: transparent;
        color: var(--el-text-color-placeholder);
      }
    }
  }
}
</style>
