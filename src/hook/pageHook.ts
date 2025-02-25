import type PageContent from '@/components/pageContent/pageContent.vue'
import { ref } from 'vue'

const pageHook = () => {
  const pagecontentRef = ref<InstanceType<typeof PageContent>>()
  const handleSearchBtnEmit = (form: any) => {
    if (pagecontentRef.value) {
      pagecontentRef.value.postListInfo(form)
    }
  }
  const handleResetBtnEmit = () => {
    if (pagecontentRef.value) {
      pagecontentRef.value.postListInfo()
    }
  }
  return {
    pagecontentRef,
    handleSearchBtnEmit,
    handleResetBtnEmit
  }
}
export default pageHook
