import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);
/* Layout */
import Layout from "../views/layout/Layout";
import store from "../store/index";


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
// console.log(store.getters.userType);
// console.log(store.getters.resourceIds);
var resourceId = store.getters.resourceIds
resourceId = resourceId.split(",")
console.log(resourceId);
let qxfun = (id) => {
  let zt = true
  resourceId.forEach(function (e) {
    if (e == id) {
      zt = false
    } else if (store.getters.userType == 'PROXY') {
      zt = false
    }
  })
  return zt
}

console.log(qxfun(8));

export const constantRouterMap = [{
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "shop/shopauditxq/shopauditxq",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    name: "小鹿有哲",
    children: [{
      path: "index",
      component: () => import("@/views/index/index"),
      meta: {
        title: "首页",
        icon: "index"
      }
    }]
  },
  {
    path: "/shop",
    component: Layout,
    redirect: "/shop/shopindex",
    name: "shop",
    meta: {
      title: "商户管理",
      icon: "example"
    },
    children: [{
        path: "shopindex",
        name: "shopindex",
        hidden: qxfun(22),
        component: () => import("@/views/shop/index"),
        meta: {
          title: "邀请商户",
          icon: "table"
        }
      },
      {
        path: "shopmanage",
        name: "shopmanage",
        hidden: qxfun(9),
        component: () => import("@/views/shop/shopmanage"),
        meta: {
          title: "门店管理",
          icon: "table"
        }
      },
      {
        path: "audit",
        name: "audit",
        hidden: qxfun(10),
        component: () => import("@/views/shop/shopaudit"),
        meta: {
          title: "门店审核",
          icon: "tree"
        }
      },
      {
        path: "shopauditxq",
        name: "shopauditxq",
        hidden: true,
        component: () => import("@/views/shop/shopauditxq"),
        meta: {
          title: "门店审核详情",
          icon: "tree"
        }
      }, {
        path: "shopmanagexq",
        name: "shopmanagexq",
        hidden: true,
        component: () => import("@/views/shop/shopmanagexq"),
        meta: {
          title: "门店详情",
        }
      }
    ]
  },
  {
    path: "/card",
    component: Layout,
    redirect: "/card/index",
    name: "card",
    meta: {
      title: "台卡管理",
      icon: "example"
    },
    children: [{
        path: "index",
        name: "index",
        hidden: qxfun(21),
        component: () => import("@/views/card/index"),
        meta: {
          title: "数据总览",
          icon: "table"
        }
      },
      {
        path: "standard",
        name: "standard",
        redirect: "/card/standard/standardtable1",
        // alwaysShow: true,
        hidden: qxfun(13),
        component: () => import("@/views/card/standard"),
        meta: {
          title: "达标记录",
          icon: "table"
        },
        children: [{
            path: "standardtable1",
            name: "standardtable1",
            component: () => import("@/views/card/standardtable1"),
            meta: {
              title: "报表查看",
              icon: "table"
            }
          },
          {
            path: "standardtable2",
            name: "standardtable2",
            alwaysShow: true,
            component: () => import("@/views/card/standardtable2"),
            meta: {
              title: "记录查看",
              icon: "table"
            }
          },
          {
            path: "history",
            component: () => import("@/views/card/history"),
            name: "history",
            hidden: true,
            meta: {
              title: "历史记录",
              icon: "icon"
            }
          },
          {
            path: "reachxq",
            name: "reachxq",
            hidden: true,
            component: () => import("@/views/card/reachxq"),
            meta: {
              title: "达标记录详情"
            }
          }
        ]
      },
      {
        path: "cardmanage",
        name: "cardmanage",
        hidden: qxfun(12),

        component: () => import("@/views/card/cardmanage"),
        meta: {
          title: "台卡管理",
          icon: "tree"
        }
      },
      {
        path: "timing",
        name: "timing",
        hidden: qxfun(23),
        component: () => import("@/views/card/timing"),
        meta: {
          title: "定时设置",
          icon: "tree"
        }
      }
    ]
  },
  {
    path: "/Dividend",
    component: Layout,
    redirect: "/Dividend/Dividendindex",
    name: "Dividend",
    meta: {
      title: "分红管理",
      icon: "example"
    },
    children: [{
        path: "Dividendindex",
        name: "Dividendindex",
        hidden: qxfun(16),
        component: () => import("@/views/Dividend/Dividendindex"),
        meta: {
          title: "商户分红总览",
          icon: "table"
        }
      },
      {
        path: "Dividendgl",
        name: "Dividendgl",
        hidden: qxfun(17),
        component: () => import("@/views/Dividend/Dividendgl"),
        meta: {
          title: "商户分红管理",
          icon: "table"
        }
      },
      {
        path: "Finance",
        name: "Finance",
        hidden: qxfun(18),
        component: () => import("@/views/Dividend/Finance"),
        meta: {
          title: "财务信息",
          icon: "tree"
        }
      }
    ]
  },
  {
    path: "/ops",
    component: Layout,
    redirect: "/ops/wordorder",
    hidden: qxfun(19),
    name: "ops",
    meta: {
      title: "运维管理",
      icon: "nested"
    },
    children: [{
        path: "/ops/wordorder",
        component: () => import("@/views/ops/wordorder"),
        name: "wordorder",
        hidden: qxfun(15),
        meta: {
          title: "工单管理"
        }
      },
      {
        path: "/ops/recycle",
        component: () => import("@/views/ops/recycle"),
        name: "recycle",
        hidden: qxfun(14),
        meta: {
          title: "回收管理"
        }
      }
    ]
  },
  {
    path: "/accountmanage",
    component: Layout,
    redirect: "/accountmanage/index",
    hidden: qxfun(20),
    name: "accountmanage",
    meta: {
      title: "业务员管理",
      icon: "example"
    },
    children: [{
      path: "index",
      name: "index",
      component: () => import("@/views/accountmanage/index"),
      meta: {
        title: "业务员管理",
        icon: "table"
      }
    }]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
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
];

export default new Router({
  mode: "history", //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
