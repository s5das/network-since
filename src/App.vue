
<template>
      <div class="main-page-head">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <div class="des-left">
          <img src="./assets/network.svg" class="img" />
          <div>Community Detection Visualization Platform</div>
        </div>
        <div class="flex-grow" />
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">Features</el-menu-item>
        <el-menu-item index="3">About us</el-menu-item>
        <el-sub-menu index="4">
          <template #title>Application</template>
          <el-menu-item index="4-1">network</el-menu-item>
          <el-menu-item index="4-2">random network</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
  <div class="des">
    MIT Licensed | Copyright © 2021-PRESENT Anthony Fu
  </div>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useRouter } from "vue-router";
const router = useRouter();
let activeIndex = ref('1')
provide('activeIndex',activeIndex)
const handleSelect = (key) => {
  switch (key) {
    case '4-1':
      activeIndex.value = '4-1' 
      router.push({
        path: "/visiual",
      });
      break;
    case '1':
      activeIndex.value = '1'
      router.push({
        path: "/",
      });
      break;
  }
}
</script>

<style lang="less" scoped>

.main-page-head {
  width: 100vw;
  height: 8vh;
  position: fixed;
  z-index: 999;
  top: 0;
  background-color: #fff;
  display: flex;
  align-items: end;
  display: flex;
  justify-content: center;
}


.des-left {
  height: 7vh;
  width: 50vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .img {
    height: 70%;
    width: auto;
  }
}

.flex-grow {
  flex-grow: 1;
}

.des{
  width: 95vw;
  display: flex;
  justify-content: center;
}
</style>

