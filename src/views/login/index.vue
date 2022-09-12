<template>
  <div class="login">
    <van-nav-bar
      class="loginNavBar"
      left-arrow
      @click-left="onClickLeft"
      title="账号登录"
    >
    </van-nav-bar>
    <!-- 表单区域 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="usernameRule"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="passwordRule"
      />
      <div style="margin: 16px" class="loginBtn">
        <van-button block native-type="submit">登&nbsp;&nbsp;录</van-button>
      </div>
    </van-form>
    <!-- /表单区域 -->
    <div class="register" @click="$router.push('/home')">
      <router-link to="" class="registerA">还没有账号，去注册~</router-link>
    </div>
  </div>
</template>

<script>
import { usernameRule, passwordRule } from '@/views/login/rules'
import { loginAPI } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      // 账号正则
      usernameRule,
      // 密码正则
      passwordRule
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onSubmit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await loginAPI(this.username, this.password)
        if (data.status === 200) {
          this.SET_TokenObj(data.body.token)
          this.$toast.success('登陆成功')
          this.$router.push('/profile')
        } else if (data.status === 400 || data.status === 401) {
          this.$toast(data.description)
        } else {
          this.$toast.clear()
          console.log('登录失败')
        }
      } catch (error) {
        this.$toast.clear()
        console.log(error)
      }
    },
    ...mapMutations(['SET_TokenObj'])
  }
}
</script>

<style scoped lang="less">
.login {
  /deep/.loginNavBar {
    background-color: #21b97a;
    height: 96px;
    margin-bottom: 10px;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
      font-size: 36px;
    }
  }
  // 表单
  .van-cell {
    font-size: 34px;
    padding: 50px 40px;
    font-weight: normal;
  }
  /deep/.loginBtn {
    .van-button--default {
      width: 99%;
      height: 100px;
      margin: 40px auto;
      font-size: 36px;
      color: #fff;
      border-radius: 6px;
      background-color: #21b97a;
    }
  }
  .register {
    margin-top: 100px;
    text-align: center;
    .registerA {
      font-size: 28px;
      text-decoration: none;
      color: #666;
    }
  }
}
</style>
