export default async ({ app, store }) => {
  app.router.afterEach((to, from) => {
    // ページ遷移ごとに行いたい処理を記述
    // 例：store.dispatch('users/getUsers')
  })
}
