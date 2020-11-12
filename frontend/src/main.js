import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//Temporario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6ImJpYSIsImVtYWlsIjoiYmlhQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MDUxMjIwMTQsImV4cCI6MTYwNTM4MTIxNH0.eaLQR9dTQACWNkKdbpLAhX09FOUFpABiYtYGvsT9CLg'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')