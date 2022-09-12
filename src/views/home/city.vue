<template>
  <div class="city">
    <van-nav-bar
      class="loginNavBar"
      left-arrow
      @click-left="onClickLeft"
      title="城市列表"
    >
    </van-nav-bar>
    <!-- 列表区域 -->
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="currentCity ? currentCity.label : CurrentCity" />
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        @click="setCurrentCity(item)"
        :title="item.label"
        v-for="item in hotList"
        :key="item.value"
      />
      <div v-for="(first, index) in FirstList" :key="index">
        <van-index-anchor :index="first" />
        <van-cell
          @click="setCurrentCity(item)"
          :title="item.label"
          v-for="item in cityData"
          v-show="item.short === first"
          :key="item.value"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { cityAPI, hotCityAPI } from '@/api/area'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      CurrentCity: '北京',
      level: 1,
      cityData: [], // 响应回的数据
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      FirstList: [
        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      hotList: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 改变当前城市
    setCurrentCity(item) {
      this.CurrentCity = item.label
      // 将当前城市存入vuex中
      this.$store.commit('SET_CURRENTCITY', item)
      this.$router.back()
    },
    // 获取热门城市
    async getHotList() {
      const { data } = await hotCityAPI()
      this.hotList = data.body
      console.log(this.hotList)
    },
    // 获取城市列表
    async getCityList() {
      try {
        const { data } = await cityAPI(this.level)
        this.cityData = data.body
        // 将响应的数据拼英转为大写
        this.cityData.forEach((item) => {
          item.short = item.short.substr(0, 1).toUpperCase()
        })
      } catch (error) {}
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  created() {
    this.getCityList()
    this.getHotList()
  }
}
</script>

<style scoped lang="less">
/deep/.loginNavBar {
  position: fixed;
  top: 0;
  background-color: #21b97a;
  width: 100%;
  height: 96px;
  margin-bottom: 10px;
  z-index: 3;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
    font-size: 36px;
  }
}
// 列表
/deep/.van-index-bar {
  padding-top: 90px;
}
/deep/.van-index-bar__sidebar {
  height: calc(100%-220px);
  display: flex;
  justify-content: space-between;
  z-index: 3;
  .van-index-bar__index {
    padding-top: 15px;
    font-weight: 100;
    border-radius: 50%;
    // background-color: #21b97a;
  }
}
/deep/.van-index-anchor {
  font-size: 28px;
  padding: 20px 30px 0;
  color: #999;
}
.van-cell::after {
  border-bottom: 2px solid#eee;
}
/deep/.van-cell__title {
  width: 100%;
  height: 50px;
  padding: 0px 15px 10px;
  line-height: 50px;

  font-size: 32px;
  color: #333;
  background: #fff;
  cursor: pointer;
}
</style>
