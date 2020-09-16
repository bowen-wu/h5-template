const routes = [
  {
    exact: true,
    path: '/',
    redirect: '/home',
  },
  { exact: true, path: '/home', component: '@/pages/home' },
  { exact: true, path: '/cart', component: '@/pages/cart' },
  {
    path: '/my',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        exact: true,
        path: '/my',
        component: '@/pages/my',
      },
      {
        exact: true,
        path: '/my/customer_service_center',
        component: '@/pages/my/customerServiceCenter',
      }
    ],
  },
  { exact: true, path: '/search', component: '@/pages/search' },
  { exact: true, path: '/payment', component: '@/pages/payment' },
  { exact: true, path: '/goods', component: '@/pages/goods' },
];

export default routes;
