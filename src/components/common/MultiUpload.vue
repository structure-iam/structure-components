<!--
  多图上传组件
  从 OAuth-UI/admin-ui 抽取，API 调用改为 props 注入
-->
<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :before-upload="handleBeforeUpload"
    :http-request="handleUpload"
    :on-remove="handleRemove"
    :on-preview="previewImg"
    :limit="props.limit"
  >
    <i-ep-plus />
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="previewImgUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  type UploadRawFile,
  type UploadRequestOptions,
  type UploadUserFile,
  type UploadFile,
  type UploadProps,
} from 'element-plus'

export interface MultiUploadProps {
  /** 文件路径集合 */
  modelValue: string[]
  /** 文件上传数量限制 */
  limit?: number
  /** 单文件最大尺寸 (bytes)，默认 2MB */
  maxSize?: number
  /** 上传函数: 接收 File 返回 { name, url } */
  uploadFn: (file: File) => Promise<{ name: string; url: string }>
  /** 删除函数: 接收文件路径 */
  deleteFn?: (filePath: string) => Promise<void>
  /** 自定义上传前校验 */
  beforeUpload?: (file: File) => boolean | Promise<boolean>
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const props = withDefaults(defineProps<MultiUploadProps>(), {
  limit: 10,
  maxSize: 2 * 1048 * 1048,
  deleteFn: undefined,
  beforeUpload: undefined,
})

const previewImgUrl = ref('')
const dialogVisible = ref(false)

const fileList = ref([] as UploadUserFile[])

watch(
  () => props.modelValue,
  (newVal: string[]) => {
    const filePaths = fileList.value.map((file) => file.url)
    if (
      filePaths.length > 0 &&
      filePaths.length === newVal.length &&
      filePaths.every((x) => newVal.some((y) => y === x)) &&
      newVal.every((y) => filePaths.some((x) => x === y))
    ) {
      return
    }

    fileList.value = newVal.map((filePath) => {
      return { url: filePath } as UploadUserFile
    })
  },
  { immediate: true },
)

async function handleUpload(options: UploadRequestOptions): Promise<void> {
  const fileInfo = await props.uploadFn(options.file as File)

  const fileIndex = fileList.value.findIndex(
    (file) => file.uid === (options.file as unknown as UploadRawFile).uid,
  )

  fileList.value.splice(fileIndex, 1, {
    name: fileInfo.name,
    url: fileInfo.url,
  } as UploadUserFile)

  emit(
    'update:modelValue',
    fileList.value.map((file) => file.url).filter((url): url is string => !!url),
  )
}

function handleRemove(removeFile: UploadFile) {
  const filePath = removeFile.url

  if (filePath) {
    const deletePromise = props.deleteFn?.(filePath) ?? Promise.resolve()
    deletePromise.then(() => {
      const urls = fileList.value
        .map((file) => file.url)
        .filter((url): url is string => !!url)
      emit('update:modelValue', urls)
    })
  }
}

function handleBeforeUpload(file: UploadRawFile): boolean | Promise<boolean> {
  if (file.size > props.maxSize) {
    const maxSizeMB = Math.round(props.maxSize / 1024 / 1024)
    ElMessage.warning(`上传文件不能大于${maxSizeMB}M`)
    return false
  }
  if (props.beforeUpload) {
    return props.beforeUpload(file)
  }
  return true
}

const previewImg: UploadProps['onPreview'] = (uploadFile) => {
  previewImgUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>
