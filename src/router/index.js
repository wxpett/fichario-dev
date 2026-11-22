import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/por-que-importa'
  },
  {
    path: '/por-que-importa',
    name: 'PorQueImporta',
    component: () => import('@/views/PorQueImportaView.vue'),
    meta: { title: 'Por que importa', folha: 1, icon: '📌' }
  },
  {
    path: '/unidades',
    name: 'Unidades',
    component: () => import('@/views/UnidadesView.vue'),
    meta: { title: 'Unidades CSS', folha: 2, icon: '📐' }
  },
  {
    path: '/flexbox-grid',
    name: 'FlexboxGrid',
    component: () => import('@/views/FlexboxGridView.vue'),
    meta: { title: 'Flexbox & Grid', folha: 3, icon: '⬛' }
  },
  {
    path: '/imagens',
    name: 'Imagens',
    component: () => import('@/views/ImagensView.vue'),
    meta: { title: 'Imagens', folha: 4, icon: '🖼️' }
  },
  {
    path: '/boas-praticas',
    name: 'BoasPraticas',
    component: () => import('@/views/BoasPraticasView.vue'),
    meta: { title: 'Boas práticas Vue', folha: 5, icon: '✅' }
  },
  {
    path: '/desafio',
    name: 'Desafio',
    component: () => import('@/views/DesafioView.vue'),
    meta: { title: 'Desafio Final', folha: 6, icon: '🏆' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
