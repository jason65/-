import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

import './assets/global.scss'
new Vue({
  render: h => h(App)
}).$mount('#app')
