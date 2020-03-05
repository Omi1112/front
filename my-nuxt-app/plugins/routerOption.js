export default async ({ app, store }) => {
  app.router.afterEach((to, from) => {
    // ページ遷移ごとに行いたい処理
    store.dispatch('users/getUsers')
  });
};
