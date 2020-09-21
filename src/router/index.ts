import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductTable from '../views/ProductTable/index.vue'
import Member from '../views/Member/index.vue'
import ProductSalesChart from '../views/ProductSalesChart/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/ProductTable',
    name: 'ProductTable',
    component: ProductTable,
  },
  {
    path: '/Member',
    name: 'Member',
    component: Member,
  },
  {
    path: '/ProductSales',
    name: 'ProductSalesChart',
    component: ProductSalesChart,
  },
]

const router = new VueRouter({
  routes,
})

export default router
