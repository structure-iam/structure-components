<template>
  <div class="editor-wrapper">
    <!-- 工具栏 -->
    <Toolbar
      :id="toolbarId"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <!-- 编辑器 -->
    <Editor
      :id="editorId"
      v-model="editorValue"
      :default-config="editorConfig"
      :mode="mode"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount, computed, defineAsyncComponent, onMounted } from 'vue'

// 动态导入可选依赖，避免消费者 DT S 预构建时因缺失 wangeditor 而失败
const Editor = defineAsyncComponent(
  () => import('@wangeditor/editor-for-vue').then(m => m.Editor)
)
const Toolbar = defineAsyncComponent(
  () => import('@wangeditor/editor-for-vue').then(m => m.Toolbar)
)

export interface WangEditorProps {
  modelValue: string
  placeholder?: string
  /** 自定义图片上传: 接收 File 返回 URL */
  uploadImageFn?: (file: File) => Promise<string>
}

const props = withDefaults(defineProps<WangEditorProps>(), {
  placeholder: '请输入内容...',
  uploadImageFn: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// 生成唯一 ID，避免同页多实例冲突
const uid = Math.random().toString(36).slice(2, 8)
const toolbarId = `toolbar-container-${uid}`
const editorId = `editor-container-${uid}`

const editorRef = shallowRef()
const mode = ref('default')
const toolbarConfig = ref({})

// 编辑器配置
const editorConfig = ref({
  placeholder: props.placeholder,
  MENU_CONF: props.uploadImageFn
    ? {
        uploadImage: {
          async customUpload(file: File, insertFn: (url: string) => void) {
            const url = await props.uploadImageFn!(file)
            insertFn(url)
          },
        },
      }
    : {},
})

const handleCreated = (editor: unknown) => {
  editorRef.value = editor
}

function handleChange(editor: { getHtml: () => string }) {
  editorValue.value = editor.getHtml()
}

// 动态加载 wangeditor 样式（可选依赖，不在 dist 中固化引用）
onMounted(() => {
  import('@wangeditor/editor/dist/css/style.css').catch(() => {})
})

// 组件销毁时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
