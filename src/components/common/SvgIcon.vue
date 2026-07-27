<!-- SVG 图标组件 (SVG Sprite 模式) -->
<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{ width: size, height: size }"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  prefix?: string
  iconClass: string
  color?: string
  size?: string
}>(), {
  prefix: 'icon',
  color: '',
  size: '1em',
})

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  outline: none;
  fill: currentcolor;
}
</style>
