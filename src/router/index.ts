import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Checklists from '@/pages/Checklists.vue'
import OneChecklist from '@/pages/OneChecklist.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/checklists',
  },
  {
    path: '/checklists',
    component: Checklists,
    meta: { title: '发版确认清单' },
  },
  {
    path: '/checklists/:id',
    component: OneChecklist,
    meta: { title: '发版确认清单详情' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || '发版确认清单'
  next()
})

export default router

