<template>
  <el-dialog
    :title="props.title"
    :visible="props.visible"
    :width="props.width || '600px'"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="props.formData"
      :rules="props.rules"
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col
          v-for="item in props.formItems"
          :key="item.prop"
          :span="item.span || 24"
        >
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input
              v-if="item.type === 'input' || !item.type"
              v-model="(props.formData as Record<string, unknown>)[item.prop]"
              :placeholder="item.placeholder"
            />
            <el-textarea
              v-else-if="item.type === 'textarea'"
              v-model="(props.formData as Record<string, unknown>)[item.prop]"
              :placeholder="item.placeholder"
              :rows="4"
            />
            <el-select
              v-else-if="item.type === 'select'"
              v-model="(props.formData as Record<string, unknown>)[item.prop]"
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-switch
              v-else-if="item.type === 'switch'"
              v-model="(props.formData as Record<string, unknown>)[item.prop]"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  visible: boolean
  width?: string
  formItems: {
    label: string
    prop: string
    type?: string
    placeholder?: string
    options?: { label: string; value: string | number }[]
    span?: number
  }[]
  formData: Record<string, unknown>
  rules?: Record<string, unknown[]>
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', formData: Record<string, unknown>): void
}>()

const formRef = ref()

const handleClose = () => {
  emit('close')
}

const handleSubmit = async () => {
  if (formRef.value) {
    try {
      await formRef.value.validate()
      emit('submit', props.formData)
    } catch {
      // validation failed
    }
  } else {
    emit('submit', props.formData)
  }
}
</script>
