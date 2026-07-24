<template>
  <el-tree
    :data="props.data"
    :props="treeProps"
    :expand-on-click-node="props.expandOnClickNode"
    :highlight-current="props.highlightCurrent"
    :default-expand-all="props.defaultExpandAll"
    @node-click="handleNodeClick"
    @check-change="handleCheckChange"
  >
    <template #default="{ node, data }">
      <slot name="default" :node="node" :data="data" />
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: Record<string, unknown>[]
  labelField?: string
  childrenField?: string
  expandOnClickNode?: boolean
  highlightCurrent?: boolean
  defaultExpandAll?: boolean
  showCheckbox?: boolean
}>()

const emit = defineEmits<{
  (e: 'node-click', data: Record<string, unknown>, node: Record<string, unknown>): void
  (e: 'check-change', data: Record<string, unknown>, checked: boolean, indeterminate: boolean): void
}>()

const treeProps = computed(() => ({
  label: props.labelField || 'label',
  children: props.childrenField || 'children',
}))

const handleNodeClick = (data: Record<string, unknown>, node: Record<string, unknown>) => {
  emit('node-click', data, node)
}

const handleCheckChange = (data: Record<string, unknown>, checked: boolean, indeterminate: boolean) => {
  emit('check-change', data, checked, indeterminate)
}
</script>
