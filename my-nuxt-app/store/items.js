import axios from "axios";

export const state = () => ({
  // Qiita API のレスポンスデータ
  items: [],
  // データローディング中かどうかを判定するフラグ
  isLoading: false
})

const BASE_URL = "https://qiita.com/api/v2/";

export const mutations = {
  async getItems({ commit }, payload) {
    console.log('tests');
    // 'isLoading' を 'true' に設定
    commit("showLoading");
    // リクエスト送信
    const response = await axios
      .get(`${BASE_URL}items`, {
        headers: { "Content-Type": "application/json" },
        params: {
          page: 1,
          per_page: 20,
          query: payload.keyword
        },
        timeout: 15000
      })
      .catch(error => {
        console.error(error);
        // 'isLoading' を 'false' に設定
        commit("hideLoading");
        // エラー画面に遷移
        this.$router.push("/error");
      });
    // 'items' にレスポンスを設定
    commit("setItems", response.data);
    // 'isLoading' を 'false' に設定
    commit("hideLoading");
  },

  setItems(state, items) {
    state.items = items;
  },
  hideLoading(state) {
    state.isLoading = false;
  },
  showLoading(state) {
    state.isLoading = true;
  }
};
