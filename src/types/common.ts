export interface PaginationParams {
  page: number,
  pageNum: number,
  pageSize: number
  keyword?: string
}

export interface PaginationResult<T> {
  list: T[]
  total: number
  page: number,
  pageNum: number,
  pageSize: number,
}

export interface FormItemProps {
  label: string
  prop: string
  type?: 'input' | 'select' | 'date' | 'datetime' | 'textarea' | 'switch' | 'radio' | 'checkbox'
  placeholder?: string
  options?: { label: string; value: string | number }[]
  rules?: Record<string, unknown>[]
  span?: number
}

export interface TableColumn {
  prop: string
  label: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  formatter?: (row: Record<string, unknown>, column: Record<string, unknown>) => string
}

export interface DialogFormProps {
  title: string
  visible: boolean
  width?: string
  formItems: FormItemProps[]
  formData: Record<string, unknown>
}
