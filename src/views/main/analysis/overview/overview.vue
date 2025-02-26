<template>
  <div class="overview">
    <OverviewCard>
      <template #title>关于</template>
      <template #content>
        Vue3Admin 是基于Vue3, Pinia, VueRouter, Vite, ElementPlus, TypeScript, Echarts等后台管理系统
      </template>
    </OverviewCard>
    <OverviewCard>
      <template #title>技术栈</template>
      <template #content>
        <ul>
          <template v-for="item in techStack" :key="item.label">
            <li style="margin-bottom: 20px">
              <span class="label">{{ item.label }}:</span>
              <span class="vaue" style="color: var(--primary-color); margin-left: 10px">{{ item.value }}</span>
            </li>
          </template>
        </ul>
      </template>
    </OverviewCard>
  </div>
</template>

<script setup lang="ts">
import OverviewCard from './cpns/overviewCard.vue'
const techStack = [
  { label: '开发工具', value: 'VScode' },
  { label: '编程语言', value: 'TypeScript + JavaScript' },
  { label: '构建工具', value: 'Vite' },
  { label: '前端框架', value: 'Vue3' },
  { label: '路由工具', value: 'VueRouter' },
  { label: '状态管理', value: 'Pinia' },
  { label: 'UI框架', value: 'ElementPlus' },
  { label: '可视化', value: 'Echarts' },
  { label: '工具库', value: '@vueuse/sore + dayjs + countup.js' },
  { label: 'CSS预编译', value: 'Less/Sass' },
  { label: 'HTTP工具', value: 'Axios' },
  { label: '代码规范', value: 'Prettier + ESLint' }
]
</script>

<style lang="less" scoped>
.overview {

}
</style>
