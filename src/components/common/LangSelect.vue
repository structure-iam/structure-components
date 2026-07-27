<template>
  <el-dropdown trigger="click" @command="handleLanguageChange">
    <div>
      <svg-icon icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lang in languages"
          :key="lang.key"
          :disabled="currentLanguage === lang.key"
          :command="lang.key"
        >
          {{ lang.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

export interface LanguageOption {
  key: string
  label: string
}

const props = defineProps<{
  /** 可用语言列表 */
  languages: LanguageOption[]
  /** 当前语言 */
  currentLanguage: string
}>()

const emit = defineEmits<{
  (e: 'change', lang: string): void
}>()

function handleLanguageChange(lang: string) {
  if (lang !== props.currentLanguage) {
    emit('change', lang)
  }
}
</script>
