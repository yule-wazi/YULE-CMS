<template>
  <div class="chat">
    <ChatEditor @postEditorEmit="postStory" />
  </div>
</template>

<script setup lang="ts">
import useStory from '@/stores/modules/main/story'
import ChatEditor from './cpns/chatEditor.vue'
const storyStore = useStory()
const postStory = (data: any) => {
  storyStore.postStoryAction(data)
}
</script>

<style lang="less" scoped>
.chat {
}
</style>
