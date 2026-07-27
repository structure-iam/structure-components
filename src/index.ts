export { default as Pagination } from './components/common/Pagination.vue'
export { default as SearchBar } from './components/common/SearchBar.vue'
export { default as DialogForm } from './components/common/DialogForm.vue'
export { default as DataTable } from './components/common/DataTable.vue'
export { default as EmptyState } from './components/common/EmptyState.vue'
export { default as TreeView } from './components/common/TreeView.vue'
export { default as Breadcrumb } from './components/common/Breadcrumb.vue'
export { default as TableAction } from './components/common/TableAction.vue'

// 新增组件
export { default as MultiUpload } from './components/common/MultiUpload.vue'
export { default as SingleUpload } from './components/common/SingleUpload.vue'
// WangEditor 已移至独立入口 ./wang-editor，避免未安装 wangeditor 的消费者编译失败
export { default as SvgIcon } from './components/common/SvgIcon.vue'
export { default as IconSelect } from './components/common/IconSelect.vue'
export { default as LangSelect } from './components/common/LangSelect.vue'
export { default as ErrorPage401 } from './components/common/ErrorPage401.vue'
export { default as ErrorPage404 } from './components/common/ErrorPage404.vue'

// 子应用布局组件
export { default as PageContainer } from './components/PageContainer/index.vue'
export { default as TagsView } from './components/TagsView/index.vue'

// 子应用 composables
export { useTagsView, useThemeFromWujie } from './composables/useSubApp'
export type { TagViewData } from './composables/useSubApp'

export { default as request } from './api/base'

export type {
  PaginationParams,
  PaginationResult,
  FormItemProps,
  TableColumn,
  DialogFormProps,
} from './types/common'
