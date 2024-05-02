const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/MainPage.vue') },
      { path: '/user', component: () => import('src/pages/UserAccount.vue') },
      { path: '/basket', component: () => import('src/pages/Basket.vue') },
      { path: '/popap', component: () => import('src/pages/PopAp.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
