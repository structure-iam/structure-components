<template>
  <el-breadcrumb :separator="separator">
    <el-breadcrumb-item
      v-for="(item, index) in items"
      :key="index"
      :to="item.path"
    >
      {{ item.label }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string; path?: string }[]
  separator?: string
}>()
</script>
