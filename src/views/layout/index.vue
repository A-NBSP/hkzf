<template>
  <!-- 布局模块 -->
  <div class="layout">
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/seek" icon="search">找房</van-tabbar-item>
      <van-tabbar-item to="/consult" icon="friends-o">咨询</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less"></style>
