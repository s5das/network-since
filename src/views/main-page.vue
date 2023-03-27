<template>
  <div class="main">
  <div :class="nav_class">
    <div class="main-page-title1">NetWork Science</div>
    <div class="menu"></div>
    <div class="search">
      <div class="search-input">
        <el-input v-model="content" class="w-50 m-2" placeholder="关键词搜索" />
      </div>
      <div class="search-ico">
        <el-icon @click="SearchGraph">
          <Search />
        </el-icon>
      </div>
    </div>
  </div>
  <div class="scroll-show">
    <el-carousel indicator-position="outside" height="60vh">
      <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item" style="width: 100vw; height: 55vh" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="main-page-content">
    <div class="main-page-title2">网络API</div>
    <div class="item" v-for="(item, index) in items" :key="item.title">
      <div class="main-page-title3">{{ item.title }}</div>
      <div class="brief" @click="Goto(index)">
        <img :src="item.picurl" />
      </div>
    </div>
  </div>  
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();

let content = ref("");
const SearchGraph = () => {
  ElNotification({
        title: "tips",
        message: h("i", { style: "color: teal" }, "搜索功能尚未开通"),
      });
};

let items = [
  {
    title: "网络可视化",
    picurl: new URL("@/assets/brief.jpg", import.meta.url).href,
  },
  {
    title: "随即图生成",
    picurl: new URL("@/assets/a.svg", import.meta.url).href,
  },
];
const Goto = (index) => {
  switch (index) {
    case 0:
      router.push({
        path: "/visiual",
      });
      break;
    case 1:
      router.push({
        path: "/random",
      });
      break;
  }
};

let originalY = window.scrollY;
console.log(originalY);
let nav_class = ref("main-page-head");
const ChangeNav = () => {
  let currentY = window.scrollY;

  if (currentY - originalY >= 60 || currentY - originalY <= -60) {
    if (currentY > originalY && currentY !== 0) {
      /* console.log('页面向上滑（即你的手指向上滑）'); */
      nav_class.value = "main-page-head hidden";
    } else {
      /* console.log('页面向下滑（即你的手指向下滑）'); */
      nav_class.value = "main-page-head";
    }
    originalY = currentY;
  }
};
let imgs = [
  new URL("@/assets/a1.jpg", import.meta.url).href,
  new URL("@/assets/a2.jpg", import.meta.url).href,
  new URL("@/assets/a3.jpg", import.meta.url).href,
];

onMounted(() => {
  window.addEventListener("scroll", ChangeNav);
});
</script>

<style scoped lang="less">

.main-page-head {
  display: flex;
  width: 100%;
  height: 15vh;
  transition: height 0.8s;
  background-color: #fff;
}

.hidden {
  height: 0 !important;
}

.main-page-title1 {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vh;
  font-weight: 600;
  color: blue;
}

.menu {
  flex: 1;
}

.search {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .search-input {
    width: 75%;
  }

  .search-ico {
    width: 20%;
  }
}

.scroll-show {
  margin-bottom: 5vh;
  height: 55vh;

  .slider {
    display: flex;
    margin: 0;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
  }
}

.main-page-content {
  padding: 0 20vw;
  margin-top: 10vh;

  .main-page-title2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5vh;
    height: 10vh;
    font-size: 5vh;
    font-weight: 600;
    border-bottom: 2px solid #c7000b;
  }

  .item {
    margin-bottom: 10vh;
    height: 65vh;

    .main-page-title3 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 20vw;
      height: 8vh;
      font-size: 5vh;
      font-weight: 600;
      border-bottom: 2px solid #08a4ed5a;
    }

    .brief {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5vh;
      margin-bottom: 5vh;
      height: 55vh;
      border: 2px solid yellow;
      border-radius: 10px;
      transition: 1s;

      img {
        width: 80%;
        height: 80%;
      }
    }

    .brief:hover {
      transform: scale(1.1);
    }
  }
}
</style>
