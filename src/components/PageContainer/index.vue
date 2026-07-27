<template>
  <div class="page-container" :style="containerStyle">
    <div class="page-container__inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'PageContainer' })

const props = withDefaults(defineProps<{
  /** 最大宽度，默认 1200px，传 0 表示不限宽 */
  maxWidth?: number | string
  /** 内边距 */
  padding?: number | string
}>(), {
  maxWidth: 1200,
  padding: 20,
})

const containerStyle = computed(() => {
  const maxW = props.maxWidth === 0 ? 'none' : (typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth)
  const pad = typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  return {
    '--pc-max-width': maxW,
    '--pc-padding': pad,
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  min-height: inherit;
  box-sizing: border-box;

  &__inner {
    max-width: var(--pc-max-width);
    margin: 0 auto;
    padding: var(--pc-padding);
    box-sizing: border-box;
  }
}
</style>
