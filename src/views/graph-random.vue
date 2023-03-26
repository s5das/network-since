<template>

    <div>

    </div>

</template>

<script  setup>
import { useRouter } from "vue-router";
const router = useRouter()

onMounted(()=>{
    ElNotification({
        title: "页面开发中",
        message: h("i", { style: "color: teal" }, "随机图生成接口尚未完善"),
      });
    setTimeout(() => {
        router.replace({
            path:'./'
        })
    }, 3000)
})
</script>

<style lang="less" scoped>
</style>