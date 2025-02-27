<template>
  <div class="chatEditor">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
    <div class="editor">
      <Editor
        class="title"
        style="height: 100px"
        v-model="valueTitle"
        :defaultConfig="editorTitleConfig"
        @onCreated="handleCreated"
      />
      <Editor
        class="content"
        style="height: 600px; overflow-y: hidden"
        v-model="valueContent"
        :defaultConfig="editorContentConfig"
        @onCreated="handleCreated"
      />
    </div>
    <div class="handleButton">
      <div class="reset"><el-button size="large" @click="resetEditor">重置</el-button></div>
      <div class="emit"><el-button type="primary" size="large" @click="postEditor">发布</el-button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
// 向父组件发送数据
const emit = defineEmits(['postEditorEmit'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueTitle = ref('')
const valueContent = ref('')

const toolbarConfig = {}
const editorTitleConfig = { placeholder: '请输入标题...' }
const editorContentConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 重置文章
const resetEditor = () => {
  valueContent.value = ''
  valueTitle.value = ''
}

// 发布文章
const postEditor = () => {
  emit('postEditorEmit', { title: valueTitle.value, content: valueContent.value })
}
</script>

<style lang="less" scoped>
.chatEditor {
  height: 100vh;
  background-color: var(--mainBg-color);
  --w-e-textarea-bg-color: var(--bg-color);
  --w-e-toolbar-bg-color: var(--bg-color);
  --w-e-toolbar-color: var(--primary-text-color);
  --w-e-textarea-color: var(--primary-text-color);
  .editor {
    margin: 30px auto;
    width: 900px;
    .title {
      font-size: 25px;
      :deep(.w-e-scroll) {
        padding: 5px 30px;
      }
      :deep(.w-e-text-placeholder) {
        padding: 7px 30px;
        font-style: normal;
        &::before {
          content: '';
          width: 100%;
          position: absolute;
          bottom: -50%;
        }
      }
    }
    .content {
      border-top: 2px var(--el-border-color-lighter) solid;
      :deep(.w-e-scroll) {
        padding: 0 30px;
      }
      :deep(.w-e-text-placeholder) {
        padding: 0 30px;
      }
    }
  }
  .handleButton {
    display: flex;
    justify-content: space-between;
    padding: 10px 500px;
    :deep(.el-button) {
      font-size: 30px;
      padding: 30px;
    }
  }
}
</style>
