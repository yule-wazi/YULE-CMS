import { postStory } from '@/service/modules/main/story'
import { defineStore } from 'pinia'

const useStory = defineStore('story', {
  actions: {
    async postStoryAction(data: any) {
      const postStoryRef = await postStory(data)
      console.log(postStoryRef)
    }
  }
})

export default useStory
