<template>
  <el-config-provider>
    <div class="demo-app">
      <el-menu mode="horizontal" :ellipsis="false" class="demo-nav">
        <div class="demo-logo">Structure Components Demo</div>
        <el-menu-item index="1" @click="scrollTo('pagination')">分页</el-menu-item>
        <el-menu-item index="2" @click="scrollTo('search')">搜索</el-menu-item>
        <el-menu-item index="3" @click="scrollTo('table')">表格</el-menu-item>
        <el-menu-item index="4" @click="scrollTo('dialog')">弹窗表单</el-menu-item>
        <el-menu-item index="5" @click="scrollTo('tree')">树</el-menu-item>
        <el-menu-item index="6" @click="scrollTo('breadcrumb')">面包屑</el-menu-item>
        <el-menu-item index="7" @click="scrollTo('action')">操作按钮</el-menu-item>
        <el-menu-item index="8" @click="scrollTo('empty')">空状态</el-menu-item>
      </el-menu>

      <div class="demo-content">
        <!-- Pagination Demo -->
        <section id="pagination" class="demo-section">
          <h2>Pagination 分页组件</h2>
          <Pagination :page="page" :page-size="pageSize" :total="100"
            @update:page="page = $event" @update:page-size="pageSize = $event" />
          <p class="demo-desc">当前页: {{ page }}, 每页: {{ pageSize }}</p>
        </section>

        <!-- SearchBar Demo -->
        <section id="search" class="demo-section">
          <h2>SearchBar 搜索组件</h2>
          <SearchBar v-model="searchKeyword" placeholder="请输入搜索关键词"
            @search="onSearch" @reset="onSearchReset" />
          <p class="demo-desc" v-if="searchHistory.length">
            搜索历史: {{ searchHistory.join(', ') }}
          </p>
        </section>

        <!-- Breadcrumb Demo -->
        <section id="breadcrumb" class="demo-section">
          <h2>Breadcrumb 面包屑</h2>
          <Breadcrumb :items="breadcrumbItems" separator="/" />
        </section>

        <!-- DataTable Demo -->
        <section id="table" class="demo-section">
          <h2>DataTable 数据表格</h2>
          <DataTable :data="tableData" :columns="tableColumns" :has-actions="true" border striped>
            <template #actions="{ row }">
              <TableAction :row="row" :actions="tableActionItems"
                @action="onTableAction" />
            </template>
          </DataTable>
        </section>

        <!-- TableAction Demo -->
        <section id="action" class="demo-section">
          <h2>TableAction 操作按钮组</h2>
          <TableAction :row="sampleRow" :actions="actionItems"
            @action="onAction" />
          <p class="demo-desc" v-if="lastAction">最近操作: {{ lastAction }}</p>
        </section>

        <!-- DialogForm Demo -->
        <section id="dialog" class="demo-section">
          <h2>DialogForm 弹窗表单</h2>
          <el-button type="primary" @click="dialogVisible = true">打开表单弹窗</el-button>
          <p class="demo-desc" v-if="submittedData">
            提交的数据: {{ JSON.stringify(submittedData) }}
          </p>
          <DialogForm title="用户信息" :visible="dialogVisible" :form-items="formItems"
            :form-data="formData" :rules="formRules" @close="dialogVisible = false"
            @submit="onSubmit" />
        </section>

        <!-- TreeView Demo -->
        <section id="tree" class="demo-section">
          <h2>TreeView 树形组件</h2>
          <TreeView :data="treeData" :show-checkbox="true" :default-expand-all="true"
            @node-click="onTreeNodeClick" @check-change="onTreeCheckChange" />
          <p class="demo-desc" v-if="lastTreeClick">
            点击节点: {{ lastTreeClick }}
          </p>
        </section>

        <!-- EmptyState Demo -->
        <section id="empty" class="demo-section">
          <h2>EmptyState 空状态</h2>
          <EmptyState description="暂无数据" image="search" />
        </section>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  Pagination, SearchBar, Breadcrumb, DataTable, TableAction,
  DialogForm, TreeView, EmptyState
} from '@structure-projects/components'
import type { FormItemProps, TableColumn } from '@structure-projects/components'

// -- Pagination --
const page = ref(1)
const pageSize = ref(10)

// -- SearchBar --
const searchKeyword = ref('')
const searchHistory = ref<string[]>([])

function onSearch(keyword: string) {
  searchHistory.value.push(`搜索: ${keyword}`)
}
function onSearchReset() {
  searchHistory.value.push('已重置')
}

// -- Breadcrumb --
const breadcrumbItems = [
  { label: '首页', path: '/' },
  { label: '组件列表', path: '/components' },
  { label: '当前页面' },
]

// -- DataTable --
const tableData = [
  { id: 1, name: '张三', age: 28, status: '在职' },
  { id: 2, name: '李四', age: 32, status: '在职' },
  { id: 3, name: '王五', age: 25, status: '离职' },
]
const tableColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'status', label: '状态', width: 100 },
]

const tableActionItems = [
  { key: 'edit', label: '编辑', type: 'primary' as const },
  { key: 'delete', label: '删除', type: 'danger' as const },
]

function onTableAction(key: string, row: Record<string, unknown>) {
  console.log('表格操作:', key, row)
}

// -- TableAction --
const sampleRow = { id: 1, name: '张三' }
const actionItems = [
  { key: 'view', label: '查看', type: 'primary' as const },
  { key: 'edit', label: '编辑', type: 'success' as const },
  { key: 'delete', label: '删除', type: 'danger' as const },
]

const lastAction = ref('')
function onAction(key: string, row: Record<string, unknown>) {
  lastAction.value = `${key} - ${row.name}`
}

// -- DialogForm --
const dialogVisible = ref(false)
const formData = reactive<Record<string, unknown>>({
  name: '',
  gender: '',
  bio: '',
  active: false,
})

const formItems: FormItemProps[] = [
  { label: '姓名', prop: 'name', placeholder: '请输入姓名' },
  {
    label: '性别', prop: 'gender', type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  { label: '简介', prop: 'bio', type: 'textarea', placeholder: '请输入简介' },
  { label: '启用', prop: 'active', type: 'switch' },
]

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
}

const submittedData = ref<Record<string, unknown> | null>(null)
function onSubmit(data: Record<string, unknown>) {
  submittedData.value = { ...data }
  dialogVisible.value = false
}

// -- TreeView --
const treeData = [
  {
    label: '一级节点 1',
    children: [
      { label: '二级节点 1-1' },
      { label: '二级节点 1-2' },
    ],
  },
  {
    label: '一级节点 2',
    children: [
      { label: '二级节点 2-1' },
      { label: '二级节点 2-2', children: [{ label: '三级节点 2-2-1' }] },
    ],
  },
]

const lastTreeClick = ref('')
function onTreeNodeClick(data: Record<string, unknown>) {
  lastTreeClick.value = data.label as string
}
function onTreeCheckChange(data: Record<string, unknown>, checked: boolean) {
  console.log('checkbox change:', data.label, checked)
}

// -- Scroll-to helper --
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f7fa;
}
.demo-app {
  min-height: 100vh;
}
.demo-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.demo-logo {
  font-size: 18px;
  font-weight: 700;
  color: #409eff;
  margin-right: 24px;
  white-space: nowrap;
}
.demo-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
.demo-section {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.demo-section h2 {
  font-size: 18px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #409eff;
  color: #303133;
}
.demo-desc {
  margin-top: 12px;
  color: #909399;
  font-size: 14px;
}
</style>
