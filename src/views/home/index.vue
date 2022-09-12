<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#888888">
      <van-swipe-item v-for="item in images" :key="item.id">
        <img
          class="imgs"
          :src="`http://liufusong.top:8080${item.imgSrc}`"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
    <!-- /轮播图 -->
    <van-search v-model="value" show-action placeholder="请输入小区或地址">
      <template #label>
        <label @click="$router.push('/city')"
          >{{ currentCity? currentCity.label : '北京'
          }}<van-icon name="arrow-down" /></label
        ><span>|</span>
      </template>
      <template #action><van-icon name="location-o" class="right" /></template>
    </van-search>
    <!-- 导航 -->
    <van-grid class="nav-bar">
      <van-grid-item text="整租">
        <template slot="icon"><img src="@/assets/imgs/1.png" /></template>
      </van-grid-item>
      <van-grid-item text="合租">
        <template slot="icon"><img src="@/assets/imgs/2.png" /></template>
      </van-grid-item>
      <van-grid-item text="地图找房">
        <template slot="icon"><img src="@/assets/imgs/3.png" /></template>
      </van-grid-item>
      <van-grid-item text="去出租">
        <template slot="icon"><img src="@/assets/imgs/4.png" /></template>
      </van-grid-item>
    </van-grid>
    <!-- 租房小组 -->
    <van-cell title="租房小组" value="更多" />
    <van-grid direction="horizontal" :column-num="2">
      <van-grid-item
        :icon="`http://liufusong.top:8080${item.imgSrc}`"
        v-for="item in tenements"
        :key="item.id"
      >
        <template #text>
          <span class="text">{{ item.title }}<br />{{ item.desc }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { swiper, tenements } from '@/api/home'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      images: [],
      tenements: []
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  methods: {
    // 轮播图
    async getImsges() {
      try {
        const {
          data: { body }
        } = await swiper()
        this.images = body
      } catch (error) {
        console.log(error)
      }
    },
    // 租房小组
    async getTenements() {
      try {
        const { data } = await tenements()
        this.tenements = data.body
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getImsges()
    this.getTenements()
  }
}
</script>

<style scoped lang="less">
// 轮播图
/deep/.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 40px;
  width: 100%;
  height: 424px;
  line-height: 424px;
  text-align: center;
  .imgs {
    width: 100%;
  }
}
// 搜索
:deep(.van-search) {
  position: fixed;
  top: 0;
  width: 100%;
  height: 68px;
  z-index: 999;
  background-color: transparent;
  padding-top: 80px;
  .van-icon {
    margin-left: 10px;
  }
  .right {
    padding-top: 20px;
    font-size: 50px;
    color: #fff;
  }
}
.van-search span {
  font-size: 40px;
  font-weight: 200;
  color: #ccc;
  margin-left: 10px;
}
// 导航
.nav-bar {
  /deep/ .van-grid-item__text {
    font-size: 28px;
    font-weight: 500;
    color: #333;
    margin: 16px 0;
  }
  img {
    width: 120px;
    height: 120px;
  }
}
// 租房小组
.van-cell__title {
  padding-left: 20px;
  font-weight: 700;
}
.van-cell__value {
  padding-right: 20px;
}
/deep/[class*='van-hairline']::after {
  border: unset;
}
.text {
  font-size: 28px;
  color: #333;
}
/deep/.van-icon__image {
  width: 100px;
  height: 100px;
  margin-right: 15px;
}
</style>
