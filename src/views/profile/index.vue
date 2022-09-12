<template>
  <div class="profile">
    <!-- 已登录 -->
    <div
      class="notLogin"
      :style="{ background: `url(http://liufusong.top:8080${userInfo.avatar})` }"
      v-if="tokenObj"
    >
      <div class="user">
        <van-image
          round
          class="via"
          :src="`http://liufusong.top:8080${userInfo.avatar}`"
        />
        <div class="username">{{ userInfo.nickname }}</div>
        <van-button class="login-btn" native-type="button" @click="gologin"
          >退出</van-button
        >
        <p class="myP" @click="$router.push('/edit')">编辑个人资料</p>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="notLogin" :style="{ background: url }" v-else>
      <div class="user">
        <van-image
          round
          class="via"
          src="http://liufusong.top:8080/img/profile/avatar.png "
        />
        <div class="username">游客</div>
        <van-button class="login-btn" @click="$router.push('/login')"
          >去登录</van-button
        >
      </div>
    </div>

    <!-- 导航 -->
    <van-grid column-num="3">
      <van-grid-item icon="star-o" text="我的收藏" />
      <van-grid-item icon="wap-home-o" text="我的出租" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="send-gift-o" text="成为房主" />
      <van-grid-item icon="contact" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <van-image
      class="vanImage"
      src="http://liufusong.top:8080/img/profile/join.png"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfoAPI } from '@/api/user'

export default {
  data() {
    return {
      url: 'http://localhost:9000/img/bg.bbb29311.png',
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    gologin() {
      this.$dialog
        .confirm({
          title: '确认退出吗'
        })
        .then(() => {
          // on confirm
          this.$store.commit('SET_TokenObj', null)
          this.$router.push('/login')
        })
        .catch(() => {
          console.log('取消执行')
        })
    },
    async getUserInfo() {
      try {
        const { data } = await userInfoAPI()
        if (data.status === 200) {
          this.userInfo = data.body
        } else if (data.status === 400) {
          this.$toast('获取用户信息失败，请刷新')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['tokenObj'])
  }
}
</script>

<style scoped lang="less">
.profile {
  // 未登录
  .notLogin {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 600px;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    .user {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      width: 640px;
      height: 330px;
      box-shadow: 0 0 20px 6px #ddd;
      z-index: 999;
      .username {
        font-size: 26px;
        margin-bottom: 30px;
      }
      .login-btn {
        padding: 0 40px;
        height: 60px;
        border-radius: 10px;
        font-size: 24px;
        background-color: #07c160;
        color: #fff;
      }
    }
  }
  // 已登录
  .myP {
    font-size: 12px;
    color: #999;
    margin-top: 13px;
  }
  .via {
    position: absolute;
    top: -70px;
    border: 10px solid #f5f5f5;
    box-shadow: 0 5px 0px 0px #ddd;
    width: 120px;
    height: 120px;
  }
  /deep/.van-grid-item {
    .van-grid-item__content {
      color: #646566;
      .van-icon {
        font-size: 40px;
      }
    }
  }
  /deep/[class*='van-hairline']::after {
    content: '';
    border: unset !important;
  }
  /deep/.vanImage {
    width: 680px;
    height: 166px;
    overflow: hidden;
    border-radius: 16px;
    margin: 0 36px;
  }
}
</style>
