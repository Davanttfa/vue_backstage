import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '小鹿有哲',
    // hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: {
        title: '首页',
        icon: 'index'
      }
    }]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shopindex',
    name: 'shop',
    meta: {
      title: '商户管理',
      icon: 'example'
    },
    children: [{
        path: 'shopindex',
        name: 'shopindex',
        component: () =>
          import('@/views/shop/index'),
        meta: {
          title: '邀请商户',
          icon: 'table'
        }
      },
      {
        path: 'shopmanage',
        name: 'shopmanage',
        component: () => import('@/views/shop/shopmanage'),
        meta: {
          title: '门店管理',
          icon: 'table'
        }
      },
      {
        path: 'audit',
        name: 'audit',
        component: () => import('@/views/shop/shopaudit'),
        meta: {
          title: '门店审核',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    redirect: '/card/index',
    name: 'card',
    meta: {
      title: '台卡管理',
      icon: 'example'
    },
    children: [{
        path: 'index',
        name: 'index',
        component: () =>
          import('@/views/card/index'),
        meta: {
          title: '数据总览',
          icon: 'table'
        }
      },
      {
        path: 'standard',
        name: 'standard',
        redirect: '/card/standard/standardtable1',
        // alwaysShow: true,
        component: () => import('@/views/card/standard'),
        meta: {
          title: '达标记录',
          icon: 'table'
        },
        children: [{
            path: 'standardtable1',
            name: 'standardtable1',
            component: () =>
              import('@/views/card/standardtable1'),
            meta: {
              title: '报表查看',
              icon: 'table'
            }
          },
          {
            path: 'standardtable2',
            name: 'standardtable2',
            alwaysShow: true,
            component: () =>
              import('@/views/card/standardtable2'),
            meta: {
              title: '记录查看',
              icon: 'table'
            }
          },
          {
            path: 'history',
            component: () => import('@/views/card/history'),
            name: 'history',
            hidden: true,
            meta: {
              title: '历史记录',
              icon: 'icon'
            }
          },
          {
            path: 'reachxq',
            name: 'reachxq',
            hidden: true,
            component: () =>
              import('@/views/card/reachxq'),
            meta: {
              title: '达标记录详情',
            }
          }
        ]
      },
      {
        path: 'cardmanage',
        name: 'cardmanage',
        component: () => import('@/views/card/cardmanage'),
        meta: {
          title: '台卡管理',
          icon: 'tree'
        }
      },
      {
        path: 'timing',
        name: 'timing',
        component: () => import('@/views/card/timing'),
        meta: {
          title: '定时设置',
          icon: 'tree'
        }
      },
      {
        path: 'carddetails',
        name: 'carddetails',
        component: () => import('@/views/card/carddetails'),
        hidden: true,
        meta: {
          title: '',
          icon: 'tree'
        }
      }

    ]
  },
  {
    path: '/ops',
    component: Layout,
    redirect: '/ops/wordorder',
    name: 'ops',
    meta: {
      title: '运维管理',
      icon: 'nested'
    },
    children: [{
        path: '/ops/wordorder',
        component: () => import('@/views/ops/wordorder'),
        name: 'wordorder',
        meta: {
          title: '工单管理'
        }
      },
      {
        path: '/ops/recycle',
        component: () => import('@/views/ops/recycle'),
        name: 'recycle',
        meta: {
          title: '回收管理'
        }
      }
    ]
  },
  {
    path: '/accountmanage',
    component: Layout,
    redirect: '/accountmanage/index',
    name: 'accountmanage',
    meta: {
      title: '业务员管理',
      icon: 'example'
    },
    children: [{
      path: 'index',
      name: 'index',
      component: () =>
        import('@/views/accountmanage/index'),
      meta: {
        title: '业务员管理',
        icon: 'table'
      }
    }, ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: '分红管理',
        icon: 'link'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  //   {
  //     path: '/card/standard/standardtable2/',
  //     component: Layout,
  //     redirect: '/card/standard/standardtable2',
  //     name: 'reachxq',
  //     hidden: true,
  //     meta: {
  //       title: '记录查看',
  //     },
  //     children: [{
  //       path: 'reachxq',
  //       name: 'reachxq',
  //       hidden: true,
  //       component: () =>
  //         import('@/views/card/reachxq'),
  //       meta: {
  //         title: '达标记录详情',
  //       }
  //     }, ]
  //   }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
