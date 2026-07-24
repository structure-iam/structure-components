<template>
  <div class="empty-state">
    <el-empty
      :description="description"
      :image="image"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  description?: string
  image?: 'empty' | 'error' | 'search' | 'network'
}>()
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}
</style>
