import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import 'jquery'

sync(store, router)

Vue.config.productionTip = false

// Vue.directive('focus', {
//   inserted: function(el) {
//     el.focus
//   },
// })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
