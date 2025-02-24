<template>
  <div class="login">
    <loginForm/>
  </div>
</template>

<script setup lang="ts">
import loginForm from './cpns/loginForm.vue';
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/【哲风壁纸】云-天空-插图.png');
  background-size: cover;
}
</style>
