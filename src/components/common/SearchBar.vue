<template>
  <div class="search-bar">
    <el-input
      v-model="keyword"
      :placeholder="placeholder"
      style="width: 240px"
      clearable
      @keyup.enter="handleSearch"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', keyword: string): void
  (e: 'reset'): void
}>()

const keyword = ref(props.modelValue || '')

watch(() => props.modelValue, (val) => {
  keyword.value = val || ''
})

const handleSearch = () => {
  emit('update:modelValue', keyword.value)
  emit('search', keyword.value)
}

const handleReset = () => {
  keyword.value = ''
  emit('update:modelValue', '')
  emit('reset')
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 12px;
  padding: 12px 0;
}
</style>
