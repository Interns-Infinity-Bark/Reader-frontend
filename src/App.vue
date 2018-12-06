<template>
  <div id="app">
    <van-nav-bar v-if="$route.path !== '/' && $route.path !== '/user'"
                 fixed title="寸读" left-text="返回" left-arrow @click-left="goBack()" />
    <van-nav-bar v-else fixed title="寸读" />
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" to="/">精选</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        active: 0,
        isIndex: true,
      };
    },
    watch: {
      '$route.path'(newValue) {
        if (newValue) {
          if (newValue !== '/user' && newValue !== '/login' && newValue !== '/register') {
            this.active = 0;
          }
        }
      },
    },
    created() {
      window.__session = JSON.parse(localStorage.getItem('session')) || {};
    },
    methods: {
      goBack() {
        history.back();
      },
    },
  }
</script>

<style lang="less">
  body {
    font-family: "Helvetica Neue",Helvetica,"Microsoft Yahei",Arial,sans-serif;
  }

  .container {
    margin: 46px 0 50px;

    a {
      color: #1989fa;
    }
  }

  .content {
    padding: 0 15px;
    font-size: 14px;
    color: #333;

    a {
      color: #1989fa;
    }
  }
</style>
