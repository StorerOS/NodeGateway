import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export { getPermissionsRoutes, getPermissionsFirstRouterPath } from './utils'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const permissionsRoutes = [
  {
    path: '/project',
    name: 'Project',
    component: Layout,
    meta: { title: '项目管理', icon: 'el-icon-s-management', permissions: ['ProjectAccess'] },
    children: [{
      path: 'list',
      name: 'List',
      component: () => import('@/views/project/list/index'),
      meta: { title: '项目列表', permissions: 'ProjectAccess' }
    }]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-s-tools', permissions: ['UserAccess', 'RoleAccess'] },
    children: [{
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user/index'),
      meta: { title: '用户管理', permissions: 'UserAccess' }
    }, {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/system/role/index'),
      meta: { title: '角色管理', permissions: 'RoleAccess' }
    }]
  }
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
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
    path: '/403',
    component: () => import('@/views/403'),
    hidden: true
  },
  {
    path: '/',
    component: Layout
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
