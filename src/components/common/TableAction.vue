<template>
  <div class="table-action">
    <el-button
      v-for="action in actions"
      :key="action.key"
      :type="action.type || 'default'"
      :size="size || 'small'"
      :icon="action.icon"
      @click="handleAction(action.key, row)"
    >
      {{ action.label }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  row: Record<string, unknown>
  actions: {
    key: string
    label: string
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
    icon?: unknown
  }[]
  size?: '' | 'default' | 'small' | 'large'
}>()

const emit = defineEmits<{
  (e: 'action', key: string, row: Record<string, unknown>): void
}>()

const handleAction = (key: string, row: Record<string, unknown>) => {
  emit('action', key, row)
}
</script>

<style scoped>
.table-action {
  display: flex;
  gap: 8px;
}
</style>
