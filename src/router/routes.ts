import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  /*    --- Commodity links ---    */
  {
    path: '/commodity',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/commodity/accCom.vue') }],
  },
  {
    path: '/commodity/cotation',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/commodity/koteCom.vue') }],
  },
  {
    path: '/commodity/ETF',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/commodity/etfCom.vue') }],
  },

  /*    --- Crypto links ---    */

  {
    path: '/crypto',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/crypto/accCryp.vue') }],
  },
  {
    path: '/crypto/cotation',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/crypto/koteCryp.vue') }],
  },
  {
    path: '/crypto/ETF',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/crypto/etfCryp.vue') }],
  },

  /*    --- Stock links ---    */

  {
    path: '/stock',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/stock/accSto.vue') }],
  },
  {
    path: '/stock/cotation',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/stock/koteSto.vue') }],
  },
  {
    path: '/stock/ETF',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/stock/etfSto.vue') }],
  },
  {
    path: '/stock/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('components/stock/searchSto.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
