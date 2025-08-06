import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SchoolInfo from '../views/SchoolInfo.vue'
import Majors from '../views/Majors.vue'
import CampusLife from '../views/CampusLife.vue'
import AdmissionGuide from '../views/AdmissionGuide.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/school-info',
    name: 'SchoolInfo',
    component: SchoolInfo,
    meta: { title: '学校介绍' }
  },
  {
    path: '/majors',
    name: 'Majors',
    component: Majors,
    meta: { title: '专业介绍' }
  },
  {
    path: '/campus-life',
    name: 'CampusLife',
    component: CampusLife,
    meta: { title: '校园生活' }
  },
  {
    path: '/admission-guide',
    name: 'AdmissionGuide',
    component: AdmissionGuide,
    meta: { title: '入学须知' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 张家界航空工业职业技术学院新生指南`
  }
  next()
})

export default router