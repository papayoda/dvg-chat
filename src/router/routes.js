const routes = [
  {
    path: "/",
    component: () => import("pages/Index.vue")
  },
  {
    path: "/chat",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Chat.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/settings",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Settings.vue") }],
  }
];

export default routes;
