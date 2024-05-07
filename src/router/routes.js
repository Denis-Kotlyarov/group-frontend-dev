const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/LandingPage.vue') },
      { path: '/search', component: () => import('src/pages/SearchPage.vue'), props: true },
      { path: '/user', component: () => import('src/pages/UserAccount.vue'), props: true  },
      { path: '/basket', component: () => import('src/pages/Basket.vue'), props: true  },
      { path: '/popap', component: () => import('src/pages/PopAp.vue') },
      { path: '/favpage', component: () => import('src/pages/FavPage.vue') },
      { path: '/noinpopup', component: () => import('src/components/NoInPopup.vue'), props: true },
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
