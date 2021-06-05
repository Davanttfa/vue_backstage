import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import '@/icons' // icon
import '@/permission' // permission control
import moment from 'moment'
Vue.use(VueClipboard)
Vue.use(ElementUI, {
  locale
})
Vue.config.productionTip = false
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
Vue.filter('toFixed2', function (value) {
  return value.toFixed(2)
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
