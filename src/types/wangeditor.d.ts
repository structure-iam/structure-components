declare module '@wangeditor/editor-for-vue' {
  import type { Component } from 'vue'
  export const Editor: Component
  export const Toolbar: Component
  export type { IDomEditor, IToolbarConfig, IEditorConfig }
}

declare module '@wangeditor/editor/dist/css/style.css'
