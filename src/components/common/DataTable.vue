<template>
  <el-table
    :data="props.data"
    :border="props.border"
    :striped="props.striped"
    :size="props.size || 'medium'"
    :max-height="props.maxHeight"
  >
    <template v-for="column in props.columns" :key="column.prop">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align || 'center'"
      >
        <template #default="{ row, column: col }">
          <template v-if="column.formatter">
            {{ column.formatter(row, col) }}
          </template>
          <template v-else>
            {{ row[column.prop] }}
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      v-if="props.hasActions"
      label="操作"
      :width="props.actionWidth || '200px'"
      align="center"
    >
      <template #default="{ row }">
        <slot name="actions" :row="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Record<string, unknown>[]
  columns: {
    prop: string
    label: string
    width?: string | number
    align?: 'left' | 'center' | 'right'
    formatter?: (row: Record<string, unknown>, column: Record<string, unknown>) => string
  }[]
  border?: boolean
  striped?: boolean
  size?: 'large' | 'medium' | 'small'
  maxHeight?: string | number
  hasActions?: boolean
  actionWidth?: string
}>()
</script>
