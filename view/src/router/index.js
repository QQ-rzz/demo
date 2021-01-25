import Vue from "vue";
import Route from "vue-router";

Vue.use(Route);
import Login from '@/views/login'

export default new Route({
  routes: [
    {
      path: '/login',
      name: 'login', // 路由名称
      component: () => import('@/views/login')
    },
    {
      path:'/index',
      name:'index',
      component: () => import('../views/index.vue'),
      children:[//二级路由
          {
              path:'/one',
              name:'one',
              component:() => import('../components/one.vue')
          },
          {
              path:'/two',
              name:'two',
              component:() => import('../components/two.vue')
          }
      ]
  }
    
  ]

});
