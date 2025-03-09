<template>
  <div class="uploadDialog">
    <el-dialog v-model="centerDialogVisible" title="文件导入" width="350" center>
      <div class="tip">
        <span class="text">请根据模板格式填写文件</span>
        <el-button type="success" plain>
            <span class="icon">
              <el-icon><Upload /></el-icon>
            </span>
            模板导出
        </el-button>
      </div>
      <div class="uploadClick">
        <el-button class="btn" type="warning" @click="uploadClick" plain>
            <span class="icon">
              <el-icon><Download /></el-icon>
            </span>
            导入
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Download } from '@element-plus/icons-vue';
import { ref } from 'vue'

const centerDialogVisible = ref(false)

const emit = defineEmits(['uploadClickEmit'])
const uploadClick = () => {
  emit('uploadClickEmit')
}
const toggleDialog = () => {
  centerDialogVisible.value = !centerDialogVisible.value
}
defineExpose({ toggleDialog })
</script>

<style lang="less" scoped>
.uploadDialog {
  .tip {
    display: flex;
    margin-top: 20px;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    .text {
      font-size: 16px;
      text-align: center;
      line-height: 100%;
    }
    .icon {
      margin-right: 5px;
    }
  }
  .uploadClick {
    width: 100%;
    margin-top: 20px;
    height: 40px;
    .btn {
      width: 100%;
      height: 100%;
      font-size: 20px;
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
