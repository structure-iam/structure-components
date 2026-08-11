<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  page: number,
  pageNum: number,
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:pageSize', value: number): void
}>()

const currentPage = ref(props.page)
const pageSize = ref(props.pageSize)

watch(() => props.page, (val) => {
  currentPage.value = val
})

watch(() => props.pageSize, (val) => {
  pageSize.value = val
})

const handleSizeChange = (val: number) => {
  pageSize.value = val
  emit('update:pageSize', val)
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  emit('update:page', val)
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
}
</style>
