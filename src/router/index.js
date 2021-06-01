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
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
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
           import('@/views/dashboard/index'),
         meta: {
           title: '数据总览',
           icon: 'table'
         }
       },
       {
         path: 'table',
         name: 'Table',
         component: () => import('@/views/table/index'),
         meta: {
           title: '达标记录',
           icon: 'table'
         }
       },
       {
         path: 'tree',
         name: 'Tree',
         component: () => import('@/views/tree/index'),
         meta: {
           title: '台卡管理',
           icon: 'tree'
         }
       },
        {
          path: 'avfd',
          name: 'avfd',
          component: () => import('@/views/tree/index'),
          meta: {
            title: '定时设置',
            icon: 'tree'
          }
        }
     ]
   },
  {
    path: '/card',
    component: Layout,
    children: [{
      path: 'index',
      name: 'add',
      component: () => import('@/views/form/index'),
      meta: {
        title: '台卡管理',
        icon: 'form'
      }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: 'menu1'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: 'menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: 'menu1-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'menu1-2-1'
                }
              },
              {
                path: 'fileUpload',
                component: () => import('@/views/dashboard/132'),
                name: 'fileUpload',
                meta: {
                  title: 'fileUpload'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: 'menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: 'menu2'
        }
      }
    ]
  },
  
  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'externalLink',
        icon: 'link'
      }
    }]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
