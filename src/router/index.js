import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Search from '../components/Search.vue'
import Item from '../components/Item.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: Home,
    //   // props: true,
    // },
    // {
    //   path: '/item/:item_id',
    //   name: 'search',
    //   component: () => import ('../components/Item.vue'),
    //   props: true,
    // },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/item/:item_id',
      name: 'item',
      component: Item,
      props: true
    },
    // { path: '*', redirect: '/' }
  ]
})

export default router
