import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/local'
Vue.use(Vuex)
const token = 'USER-TOKEN'
const city = 'CURRENT-CITY'
export default new Vuex.Store({
  state: {
    tokenObj: getItem(token),
    currentCity: getItem(city)
  },
  getters: {},
  mutations: {
    // 设置token
    SET_TokenObj(state, payload) {
      state.tokenObj = payload
      setItem(token, state.tokenObj)
    },
    // 设置当前城市
    SET_CURRENTCITY(state, payload) {
      state.currentCity = payload
      setItem(city, state.currentCity)
    }
  },
  actions: {},
  modules: {}
})
