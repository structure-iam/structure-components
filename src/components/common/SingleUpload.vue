<template>
  <!-- 单图上传组件 -->
  <el-upload
    v-model="imgUrl"
    class="single-uploader"
    :show-file-list="false"
    list-type="picture-card"
    :before-upload="handleBeforeUpload"
    :http-request="uploadFile"
  >
    <img v-if="imgUrl" :src="imgUrl" class="single-uploader__image" />
    <el-icon v-else class="single-uploader__icon"><i-ep-plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage, type UploadRawFile, type UploadRequestOptions } from 'element-plus'

export interface SingleUploadProps {
  modelValue: string
  /** 单文件最大尺寸 (bytes)，默认 2MB */
  maxSize?: number
  /** 上传函数: 接收 File 返回 URL 字符串 */
  uploadFn: (file: File) => Promise<string>
}

const props = withDefaults(defineProps<SingleUploadProps>(), {
  maxSize: 2 * 1048 * 1048,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const imgUrl = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

async function uploadFile(options: UploadRequestOptions): Promise<void> {
  const fileInfo = await props.uploadFn(options.file as File)
  imgUrl.value = fileInfo
}

function handleBeforeUpload(file: UploadRawFile): boolean {
  if (file.size > props.maxSize) {
    const maxSizeMB = Math.round(props.maxSize / 1024 / 1024)
    ElMessage.warning(`上传文件不能大于${maxSizeMB}M`)
    return false
  }
  return true
}
</script>

<style scoped lang="scss">
.single-uploader {
  overflow: hidden;
  cursor: pointer;
  border: 1px var(--el-border-color) solid;
  border-radius: 6px;

  &:hover {
    border-color: var(--el-color-primary);
  }

  &__image {
    display: block;
    width: 178px;
    height: 178px;
  }

  &__icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
}
</style>
