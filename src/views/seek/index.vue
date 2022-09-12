<template>
  <div class="seek">
    <van-search
      v-model="value"
      background="#4fc08d"
      show-action
      placeholder="请输入小区或地址"
    >
      <template #left>
        <van-icon name="arrow-left" @click="onClickLeft" class="zuojianyou" />
      </template>
      <template #label>
        <label @click="$router.push('/city')"
          >{{ currentCity ? currentCity.label : '北京'
          }}<van-icon name="arrow-down" /></label
        ><span>|</span>
      </template>
      <template #action><van-icon name="location-o" class="right" /></template>
    </van-search>
    <!-- 标签 -->
    <van-sticky>
      <van-dropdown-menu class="van-dropdown">
        <van-dropdown-item v-model="value1" title="区域">
          <template #default>
            <van-picker
              show-toolbar
              toolbar-position="bottom"
              :columns="columns1"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item v-model="value1" title="方式">
          <template #default>
            <van-picker
              show-toolbar
              toolbar-position="bottom"
              :columns="columns"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item v-model="value1" title="租金">
          <template #default>
            <van-picker
              show-toolbar
              toolbar-position="bottom"
              :columns="columns"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item v-model="value1" title="筛选">
          <template #default>
            <van-picker
              show-toolbar
              toolbar-position="bottom"
              :columns="columns"
            />
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <!-- 租房信息列表 -->
    <van-card
      class="van-cardList"
      :desc="item.desc"
      :title="item.title"
      currency=""
      :thumb="`http://liufusong.top:8080${item.houseImg}`"
      v-for="(item, index) in houseList"
      :key="index"
    >
      <template #price>
        <span class="price">{{ item.price }}</span>
        <span class="text">元/月</span>
      </template>
      <template #tags>
        <van-tag
          plain
          type="danger"
          v-for="(tag, index) in item.tags"
          :key="index"
          >{{ tag }}</van-tag
        >
      </template>
    </van-card>
  </div>
</template>

<script>
import { getHousesAPI, getConditionAPI } from '@/api/house'
// import { getCommunityAPI } from '@/api/area'
import { mapState } from 'vuex'

export default {
  name: 'seek',
  data() {
    return {
      columns: [], // 城市下级房屋信息
      houseList: [],
      active: 2,
      value: '',
      value1: 0,
      cityId: 'AREA|88cff55c-aaa4-e2e0',
      columns1: []
    }
  },
  created() {
    this.getHouses()
    this.getCondition()
    // this.getSonCity()
    // 如果本地有当前城市的值，就获取当前城市的房屋信息，没有获取
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    // 根据条件查询房屋
    async getHouses() {
      try {
        // 如果本地有当前城市的值，就获取当前城市的房屋id，没有默认北京
        if (this.currentCity) {
          this.cityId = this.currentCity.value
        }
        const { data } = await getHousesAPI(this.cityId)
        this.houseList = data.body.list
      } catch (error) {
        console.log(error)
      }
    },
    // 获取房屋查询条件
    async getCondition() {
      try {
        // 如果本地有当前城市的值，就获取当前城市的房屋id，没有默认北京
        if (this.currentCity) {
          this.cityId = this.currentCity.value
        }
        const { data } = await getConditionAPI(this.currentCity.value)
        this.columns = data.body
        // 将label转换为value
        const str = JSON.stringify(this.columns).replace(/label/g, 'text')
        this.columns = JSON.parse(str)
        const { area, subway } = this.columns
        this.columns1 = [area, subway]
        console.log(this.columns1)
        // console.log(this.columns)
      } catch (error) {
        if (!error.response) {
          throw error
        }
      }
    }
    // 获取子级城市列表
    // async getSonCity() {
    //   if (this.currentCity) {
    //     this.cityId = this.currentCity.value
    //   }
    //   const { data } = await sonCityAPI(this.cityId)
    //   console.log(data)
    //   this.sonCityList = data.body
    //   data.body.forEach((sonCity) => {
    //     this.columns[0].children.push({ text: sonCity.label })
    //   })
    // }
  },
  computed: {
    ...mapState(['currentCity'])
  }
}
</script>

<style scoped lang="less">
.seek {
  padding-bottom: 100px;
  // 搜索
  :deep(.van-search) {
    position: relative;
    top: 0;
    width: 100%;
    height: 128px;
    z-index: 999;
    .van-icon {
      margin-left: 10px;
    }
    .right {
      padding-top: 20px;
      font-size: 50px;
      color: #fff;
    }
    .zuojianyou {
      color: #fff;
      margin-right: 10px;
    }
  }
  .van-search span {
    font-size: 40px;
    font-weight: 200;
    color: #ccc;
    margin-left: 10px;
  }
  // 标签

  // 列表
  /deep/.van-card__thumb {
    margin-right: 40px;
    width: 212px;
    height: 194px;
    img {
      border-radius: 0;
    }
  }
  /deep/.van-card__title {
    font-size: 30px;
    color: #000;
    font-weight: 700;
  }
  /deep/.van-card__desc {
    margin: 10px 0;
    font-size: 12px;
    color: #afb2ba;
  }
  /deep/.van-card__content {
    display: flex;
    justify-content: space-around;
  }
  /deep/.van-tag--danger {
    background: rgb(225, 245, 248);
    color: rgb(57, 190, 205);
  }
  /deep/.van-card__price {
    color: #fa5741;
    .price {
      font-weight: 700;
      font-size: 32px;
    }
    .text {
      margin-left: 10px;
      font-size: 24px;
    }
  }
  /deep/.van-tag--plain::before {
    border: none;
  }
  /deep/.van-image__img {
    width: 100%;
    height: 160px;
  }
}
</style>
